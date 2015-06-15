/**
 * Copyright 2011 Adrian Witas
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.spacecraft.game.language.java.compiler.impl;

import com.google.common.io.Files;
import com.spacecraft.game.language.java.compiler.JavaSourceCompiler;
import com.spacecraft.game.language.java.compiler.registry.JavaFileObjectRegistry;
import com.spacecraft.game.language.java.compiler.registry.impl.JavaFileObjectRegistryImpl;
import com.spacecraft.game.language.java.compiler.util.ClassPathUtil;
import com.spacecraft.game.language.java.compiler.util.URIUtil;

import javax.tools.*;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Provides implementation of JavaSourceCompiler interface. This implementation
 * uses {@link javax.tools.JavaCompiler}.
 * <p>
 * <b>Usage:</b> <code><pre>
 * JavaSourceCompiler javaSourceCompiler = new JavaSourceCompilerImpl();
 * JavaSourceCompiler.CompilationUnit compilationUnit = javaSourceCompiler.createCompilationUnit();
 * compilationUnit.addJavaSource("com.test.foo.Foo","package com.test.foo;" +
 *        "public class Foo {\n" +
 *        "        public static void main(String [] args) {\n" +
 *        "            System.out.println(\"Hello world\");\n" +
 *        "        }\n" +
 *        "}");
 * ClassLoader classLoader = javaSourceCompiler.compile(compilationUnit);
 * Class clazz = classLoader.loadClass("com.test.foo.Foo");
 * Object foo = clazz.newInstance();
 * Method main = clazz.getMethod("main", String[].class);
 * String args = null;
 * main.invoke(foo, args);
 * </pre></code>
 * </p>
 * <p/>
 * <p/>
 * <p>
 * <i>Note</i> that to be able to use java compiler you will have to add
 * tools.jar to your class path.
 * </p>
 *
 * @author Adrian Witas
 */
public class JavaSourceCompilerImpl implements JavaSourceCompiler
{
    private final Logger logger = Logger.getLogger(JavaSourceCompilerImpl.class
            .getName());

    private static final List<String> CLASS_PATH_OPTIONS = new ArrayList<>(
            Arrays.asList("cp", "classpath"));
    private static final String CLASS_PATH_DELIMITER = ClassPathUtil
            .getClassPathSeparator();

    @Override
    public ClassLoader compile(CompilationUnit compilationUnit,
                               String... options)
    {
        return compile(getClass().getClassLoader(), compilationUnit,
                options);
    }

    @Override
    public ClassLoader compile(ClassLoader parentClassLoader,
                               CompilationUnit compilationUnit, String... options)
    {
        DiagnosticCollector<JavaFileObject> diagnosticsCollector = new DiagnosticCollector<>();
        ClassLoader resultingClassLoader = compile(parentClassLoader,
                compilationUnit, diagnosticsCollector, options);
        StringBuilder diagnosticBuilder = new StringBuilder();
        boolean compilationError = false;
        for (Diagnostic<?> diagnostic : diagnosticsCollector.getDiagnostics())
        {
            compilationError |= buildDiagnosticMessage(diagnostic,
                    diagnosticBuilder);
        }
        if (diagnosticBuilder.length() > 0)
        {
            if (compilationError)
            {
                throw new IllegalStateException(diagnosticBuilder.toString());
            }
            else
            {
                logger.log(Level.WARNING, diagnosticBuilder.toString());
            }
        }
        return resultingClassLoader;
    }

    @Override
    public ClassLoader compile(CompilationUnit compilationUnit,
                               DiagnosticCollector<JavaFileObject> diagnosticsCollector,
                               String... options)
    {
        return compile(getClass().getClassLoader(), compilationUnit,
                diagnosticsCollector, options);
    }

    @Override
    public ClassLoader compile(ClassLoader parentClassLoader,
                               CompilationUnit compilationUnit,
                               DiagnosticCollector<JavaFileObject> diagnosticsCollector,
                               String... options)
    {
        JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
        return compile(compiler, parentClassLoader, compilationUnit,
                diagnosticsCollector, options);
    }

    protected ClassLoader compile(JavaCompiler compiler,
                                  ClassLoader parentClassLoader, CompilationUnit compilationUnit,
                                  DiagnosticCollector<JavaFileObject> diagnosticsCollector,
                                  String... options)
    {
        if (compiler == null)
        {
            throw new IllegalStateException(
                    "Failed to find the system Java compiler. Check that your class path includes tools.jar");
        }
        JavaFileObjectRegistry registry = compilationUnit.getRegistry();
        SimpleClassLoader result = new SimpleClassLoader(parentClassLoader,
                registry, compilationUnit.getOutputClassDirectory());
        JavaFileManager standardFileManager = compiler.getStandardFileManager(
                diagnosticsCollector, null, null);
        JavaFileManager javaFileManager = new SimpleJavaFileManager(
                standardFileManager, result, registry);
        Iterable<JavaFileObject> sources = registry
                .get(JavaFileObject.Kind.SOURCE);
        Collection<String> compilationOptions = buildOptions(compilationUnit,
                result, options);
        JavaCompiler.CompilationTask task = compiler.getTask(null,
                javaFileManager, diagnosticsCollector, compilationOptions,
                null, sources);
        task.call();
        result.addClassPathEntries(compilationUnit.getClassPathsEntries());
        return result;
    }

    protected boolean buildDiagnosticMessage(Diagnostic<?> diagnostic,
                                             StringBuilder diagnosticBuilder)
    {
        Object source = diagnostic.getSource();
        String sourceErrorDetails = "";
        if (source != null)
        {
            JavaSourceFileObject sourceFile = JavaSourceFileObject.class
                    .cast(source);
            CharSequence sourceCode = sourceFile.getCharContent(true);
            int startPosition = Math.max(
                    (int) diagnostic.getStartPosition() - 10, 0);
            int endPosition = Math.min(sourceCode.length(),
                    (int) diagnostic.getEndPosition() + 10);
            sourceErrorDetails = sourceCode.subSequence(startPosition,
                    endPosition).toString();
        }
        diagnosticBuilder.append(diagnostic.getMessage(null));
        diagnosticBuilder.append("\n");
        diagnosticBuilder.append(sourceErrorDetails);
        return diagnostic.getKind().equals(Diagnostic.Kind.ERROR);
    }

    protected Collection<String> buildOptions(CompilationUnit compilationUnit,
                                              SimpleClassLoader classLoader, String... options)
    {
        List<String> result = new ArrayList<>();
        Map<String, String> optionsMap = new HashMap<>();
        for (int i = 0; i < options.length; i += 2)
        {
            optionsMap.put(options[i], options[i + 1]);
        }
        for (String classPathKey : CLASS_PATH_OPTIONS)
        {
            if (optionsMap.containsKey(classPathKey))
            {
                addClassPath(compilationUnit, optionsMap.get(classPathKey));
            }
        }
        for (String key : optionsMap.keySet())
        {
            if (CLASS_PATH_OPTIONS.contains(key))
            {
                continue;
            }
            result.addAll(Arrays.asList(key, optionsMap.get(key)));
        }
        addClassPath(result, compilationUnit);

        return result;
    }

    /**
     * Adds given class path entries of compilation unit to the supplied option
     * result list. This method simply add -cp
     * 'cass_path_entry1:...:clas_path_entry_x' options
     *
     * @param result          result list
     * @param compilationUnit compilation unit
     */
    private void addClassPath(List<String> result,
                              CompilationUnit compilationUnit)
    {
        StringBuilder classPathBuilder = new StringBuilder();
        for (String entry : compilationUnit.getClassPathsEntries())
        {
            if (classPathBuilder.length() > 0)
            {
                classPathBuilder.append(CLASS_PATH_DELIMITER);
            }
            classPathBuilder.append(entry);
        }
        if (classPathBuilder.length() > 0)
        {
            result.addAll(Arrays.asList("-cp", classPathBuilder.toString()));
        }
    }

    protected void addClassPath(CompilationUnit result, String classPath)
    {
        String[] classPathEntries = classPath.split(CLASS_PATH_DELIMITER);

        for (String classPathEntry : classPathEntries)
        {
            result.addClassPathEntry(classPathEntry);
        }
    }

    @Override
    public CompilationUnit createCompilationUnit()
    {
        File outputDirectory = new File(System.getProperty("java.io.tmpdir"),
                "compiled-code_" + System.currentTimeMillis());
        return createCompilationUnit(outputDirectory);
    }

    @Override
    public CompilationUnit createCompilationUnit(File outputClassDirectory)
    {
        return new CompilationUnitImpl(outputClassDirectory);
    }

    @Override
    public void persistCompiledClasses(CompilationUnit compilationUnit)
    {
        JavaFileObjectRegistry registry = compilationUnit.getRegistry();
        File classOutputDirectory = compilationUnit.getOutputClassDirectory();
        if (!classOutputDirectory.exists())
        {
            if (!classOutputDirectory.mkdirs())
            {
                throw new IllegalStateException("Failed to create directory "
                        + classOutputDirectory.getAbsolutePath());
            }
        }
        for (JavaFileObject javaFileObject : registry
                .get(JavaFileObject.Kind.CLASS))
        {
            String internalName = javaFileObject.getName().substring(1);
            File compiledClassFile = new File(classOutputDirectory,
                    internalName);
            if (!compiledClassFile.getParentFile().exists()
                    && !compiledClassFile.getParentFile().mkdirs())
            {
                throw new IllegalStateException("Failed to create directories "
                        + compiledClassFile.getParent());
            }
            try
            {
                Files.write(JavaCodeFileObject.class.cast(javaFileObject)
                        .getByteCode(), compiledClassFile);
            }
            catch (IOException e)
            {
                throw new IllegalStateException("Failed to write to file "
                        + compiledClassFile, e);
            }
        }
    }

    public static class CompilationUnitImpl implements CompilationUnit
    {
        private final List<String> classPathEntries = new ArrayList<>();
        private final JavaFileObjectRegistry registry = new JavaFileObjectRegistryImpl();
        private final File outputClassDirectory;

        public CompilationUnitImpl(File outputClassDirectory)
        {
            this.outputClassDirectory = outputClassDirectory;
        }

        @Override
        public void addClassPathEntry(String classPathEntry)
        {
            classPathEntries.add(classPathEntry);
        }

        @Override
        public void addClassPathEntries(Collection<String> classPathEntries)
        {
            this.classPathEntries.addAll(classPathEntries);
        }

        @Override
        public void addJavaSource(String className, String source)
        {
            URI sourceUri = URIUtil.buildUri(StandardLocation.SOURCE_OUTPUT,
                    className);
            registry.register(new JavaSourceFileObject(sourceUri, source));
        }

        @Override
        public JavaFileObjectRegistry getRegistry()
        {
            return registry;
        }

        @Override
        public List<String> getClassPathsEntries()
        {
            return classPathEntries;
        }

        @Override
        public File getOutputClassDirectory()
        {
            return outputClassDirectory;
        }
    }
}
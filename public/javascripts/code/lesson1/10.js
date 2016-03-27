// Измените условие так, чтоб вывелось
// сообщение - "Ограничить BBot'а от контроля системы."
// и система не была передана BBot'у под контроль.

// Если условие является истинным (в нашем случае 3 <= 3 - истинное условие),
// то выполнится блок1.
if (3 <= 3)
{
	// блок1 - системы будут переданы под контроль BBot'у
	BBotDebug("Передать все системы под контроль BBot'у.");
}
// Иначе (если условие в if-скобках является ложным),
// выполнится блок2.
// В нашем случае 3 <= 3 - истинное условие, поэтому блок2 не выполнится =(.
// Нужно что-то предпринять.
else
{
	// блок2 - Ограничиваем систему от BBot'а
	BBotDebug("Ограничить BBot'а от контроля системы.");
}
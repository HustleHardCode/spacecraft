/**
 * Created by Ivan on 31.01.2016.
 */

var carousel =
	[
		{
			title: 'Уничтоженные корабли',
			code: '<canvas id="line" class="chart chart-line graphics" chart-data="killSpaceCraft"'
			+'chart-labels="labels" chart-legend="true" chart-series="series">'
			+'</canvas>'
		},
		{
			title: 'Собранные бонусы',
			code: '<canvas id="bar" class="chart chart-bar graphics" chart-data="takeBonus"'
			+'chart-labels="labels" chart-legend="true" chart-series="series">'
			+'</canvas>'
		},
		{
			title: 'Общие количество набранных очков',
			code: '<canvas id="radar" class="chart chart-radar graphics" chart-data="totaleScore"'
			+'chart-labels="labels" chart-legend="true" chart-series="series">'
			+'</canvas>'
		}
	];

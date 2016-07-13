'use strict';

var mongoose = require('utils/mongoose');
var async = require('async');
var User = require('models/user').User;
var log = require('utils/log')(module);

var Schema = mongoose.Schema;

var schema = new Schema({

	date: {
		type: Date
	},
	cohorts: {
		type: Array
		//  структура каждого из элементов массива
		//	lessons: [{numb:, starsNumb: }],
		//	numbClicksOnLesson: ,
		//	visits:
	}

});

schema.statics.updateCohort = updateCohort;

exports.Cohorts = mongoose.model('Cohorts', schema);

function updateCohort(userID, callback) {

	var Cohort = this;

	User.getUserCreationDate(userID, function(createdDate) {

		if (createdDate) {

			// сегоднящняя дата
			var todayDate = getTodayDate();

			async.waterfall([

					function (_callback) {

						Cohort.findOne ({date: todayDate}, _callback);

					},
					function (data,_callback) {

						var cohortID = dateToInt(createdDate);

						if (!data) {

							addNewCohort(Cohort, todayDate, cohortID, callback);

						}
						else {

							update(data, cohortID, callback, Cohort, _callback);

						}
					}
				], function (err) {

					if (err) {

						log.warn("Cohort can't update.");
					}
				});
		}
		else {

			callback(null);

		}
	});

}

function update(data, cohortID, callback, Cohort, _callback) {

	var _cohorts = data.cohorts;

	// проверяем наличие необходимой кагорты
	if (!_cohorts[cohortID]) {

		data.cohorts = createEmptyCohorts(cohortID, _cohorts);

	}

	// выполняем необходимые опреции над данными
	callback(data, cohortID);

	Cohort.findByIdAndUpdate(data._id, {cohorts: data.toObject().cohorts}, {upsert: true}, _callback);
}

function addNewCohort(Cohort, todayDate, cohortID, callback) {

	var newData = new Cohort({

		date: todayDate,
		cohorts: createEmptyCohorts(cohortID)

	});

	// выполняем необходимые опреции над данными
	callback(newData, cohortID);

	newData.save();

}

// функция возвращает сегоднешнюю дату,
// при этом время установленно на 0.0:0
function getTodayDate () {

	return (new Date()).setHours(0, 0, 0, 0);

}

// превращаем дату в число, по которому
// будет храниться инфа в массиве
function dateToInt (date) {

	return date.getMonth();

}

// возвращает набор полей, которые должны быть в когорте
function createEmptyCohorts (date, arr) {

	var array = arr ? arr : [];

	array[date] = {

		numbClicksOnLesson: 0,
		visits: 0,
		lessons: []

	};

	return array;

}

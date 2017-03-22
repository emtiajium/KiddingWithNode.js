var fs = require('fs');
var mysql = require('mysql');
var jsPDF = require('./public/javascripts/jspdf.js');
var databaseOptions = require('./databaseOptions');

module.exports.serveForm = function(id) {
	
	var year, code, roll;
	var password;
	var name, departmentName;
	var fatherName, motherName, nationality;
	var course1, course2, course3, course4, course5, course6, course7, course8;
	var hallName;
	var totalCredit;
	var course1Title, course2Title, course3Title, course4Title, course5Title, course6Title, course7Title, course8Title;
	var credit1, credit2, credit3, credit4, credit5, credit6, credit7, credit8;
	var amount;
	var donation;
	var totalAmount;

	id = String(id); // for jsPDF datatype must be string or array
	year = id[0] + id[1];
	code = id[2] + id[3];
	roll = id[4] + id[5] + id[6];

	function queryFromDatabase(callback) {
		var db = databaseOptions.createConnection;
		var connection = databaseOptions.connection;

		var sqlStatement = 'SELECT `name`, `dept_name` FROM `academic_info` WHERE `id` = ' + id;
		db.query(sqlStatement, function(err, rows) {
			if(err) {
				console.log(err.message);
				// Handle each error | below
				callback();
			}
			//console.log(rows.length);
			name = rows[0].name;
			departmentName = rows[0].dept_name;

      sqlStatement = 'SELECT `father_name`, `mother_name`, `nationality` FROM `personal_info` WHERE `id` = ' + id;
      db.query(sqlStatement, function(err, rows) {
        fatherName = rows[0].father_name;
        motherName = rows[0].mother_name;
        nationality = rows[0].nationality;

        sqlStatement = 'SELECT `course1`, `course2`, `course3`, `course4`, `course5`, `course6`, `course7`, `course8` FROM `termcourse` WHERE `level_term` =31';
        db.query(sqlStatement, function(err, rows) {
          course1 = rows[0].course1;
          course2 = rows[0].course2;
          course3 = rows[0].course3;
          course4 = rows[0].course4;
          course5 = rows[0].course5;
          course6 = rows[0].course6;
          course7 = rows[0].course7;
          course8 = rows[0].course8;

          sqlStatement = 'SELECT `hall_name` FROM `hall_info` WHERE `id` = ' + id;
          db.query(sqlStatement, function(err, rows) {
            hallName = rows[0].hall_name;
            sqlStatement = 'SELECT SUM(`credit`) AS `total_credit` FROM `level-3term-1`';

            db.query(sqlStatement, function(err, rows) {
              totalCredit = rows[0].total_credit;

              sqlStatement = 'SELECT * FROM `level-3term-1`';
              db.query(sqlStatement, function(err, rows) {
                course1Title = rows[0].course_title;
                course2Title = rows[1].course_title;
                course3Title = rows[2].course_title;
                course4Title = rows[3].course_title;
                course5Title = rows[4].course_title;
                course6Title = rows[5].course_title;
                course7Title = rows[6].course_title;
                course8Title = rows[7].course_title;

                credit1 = rows[0].credit;
                credit2 = rows[1].credit;
                credit3 = rows[2].credit;
                credit4 = rows[3].credit;
                credit5 = rows[4].credit;
                credit6 = rows[5].credit;
                credit7 = rows[6].credit;
                credit8 = rows[7].credit;

                sqlStatement = 'SELECT `amount` FROM `termcourse` WHERE `level_term` = 31';
                db.query(sqlStatement, function(err, rows) {
                  amount = rows[0].amount;

                  sqlStatement = 'SELECT `donation` FROM `eco_info` WHERE `id` = ' + id;
                  db.query(sqlStatement, function(err, rows) {
                    donation = rows[0].donation;
                    callback();
                  });
                });
              });
            });
          });
        });
      });
		});
	}

	queryFromDatabase(function logMyNumber() {

		//db.end();
		totalAmount = amount + donation;
		amount = String(amount);
		donation = String(donation);
		totalAmount = String(totalAmount);
		credit1 = String(credit1);
		credit2 = String(credit2);
		credit3 = String(credit3);
		credit4 = String(credit4);
		credit5 = String(credit5);
		credit6 = String(credit6);
		credit7 = String(credit7);
		credit8 = String(credit8);
		totalCredit = String(totalCredit);

		//console.log(name + ' ' + departmentName + ' ' + hallName);

		var admitCard = function () {
			var doc = new jsPDF();
			doc.text(173, 8, 'Office copy');
			doc.setLineWidth(.7);
			doc.line(172, 10, 202, 10); // horizontal line		
			doc.text(18, 18, departmentName);
			doc.text(10, 20, '...................');
			doc.text(175, 18, id);
			doc.text(170, 20, '......................');
			doc.text(10, 25, 'Department');
			doc.text(170, 25, 'Class Roll No');
			doc.setFontSize(20);
			doc.setFontType('bold');
			doc.text(20, 35, 'Chittagong University of Engineering & Technology');
			doc.setFontSize(16);
			doc.setFontType('normal');
			doc.rect(87, 38, 36, 10);//rectangle
			doc.text(91, 45, 'Admit Card');
			doc.text(10, 55, 'Level:  		3, Term:  				I  Exam, 19....');
			doc.text(10, 65, 'Opening Date of Exam:');
			doc.text(10, 75, 'Exam Roll No:');
			doc.text(50, 75, id);
			doc.text(10, 85, 'Registration No:');
			doc.text(53, 85, id);
			doc.text(100, 85, 'Session:	1982-83');
			doc.text(10, 95, 'Name of Examinee:');
			doc.text(60, 95, name);
			doc.text(10, 115, '................................................');
			doc.text(125, 115, '..................................................');
			doc.text(10, 120, 'Signature of Head of the Dept');
			doc.text(125, 120, 'Signature of Controller of Exam');
			doc.text(0, 135, '........................................................................................................................................................');
			
			doc.text(170, 145, 'Student copy');
			doc.setLineWidth(.7);
			doc.line(168, 147, 205, 147); // horizontal line		
			doc.text(15, 158, departmentName);
			doc.text(175, 158, id);
			doc.text(10, 160, '...................');
			doc.text(170, 160, '......................');
			doc.text(10, 165, 'Department');
			doc.text(170, 165, 'Class Roll No');
			doc.setFontSize(20);
			doc.setFontType('bold');
			doc.text(20, 175, 'Chittagong University of Engineering & Technology');
			doc.setFontSize(16);
			doc.setFontType('normal');
			doc.rect(87, 178, 36, 10);//rectangle
			doc.text(90, 185, 'Admit Card');
			doc.text(10, 195, 'Level:  			3, Term:  				I     Exam, 19....');
			doc.text(10, 205, 'Opening Date of Exam:');
			doc.text(58, 215, id);
			doc.text(10, 215, 'Exam Roll No:');
			doc.text(58, 225, id);
			doc.text(10, 225, 'Registration No:');
			doc.text(100, 225, 'Session:	1982-83');
			doc.text(60, 235, name);
			doc.text(10, 235, 'Name of Examinee:');
			doc.text(10, 245, 'Courses Taken:');
			doc.setFontSize(12);
			doc.text(50, 255, course1 + ', ');
			doc.text(70, 255, course2 + ', ');
			doc.text(90, 255, course3 + ', ');
			doc.text(110, 255, course4 + ', ');
			doc.text(130, 255, course5 + ', ');
			doc.text(150, 255, course6 + ', ');
			doc.text(170, 255, course7 + ', ');
			doc.text(190, 255, course8);
			doc.setFontSize(16);
			doc.text(20, 255, 'I) Regular:');
			doc.text(20, 265, 'II) Self Study:');
			doc.text(10, 280, '................................................');
			doc.text(125, 280, '..................................................');
			doc.text(10, 285, 'Signature of Head of the Dept');
			doc.text(125, 285, 'Signature of Controller of Exam');
			
			doc.addPage();

			doc.text(85, 15, name);	
			doc.text(10, 15, '1. Name of the Examinee:');
			doc.text(85, 25, fatherName);
			doc.text(10, 25, '2. Father\'s Name:');
			doc.text(85, 35, motherName);
			doc.text(10, 35, '3. Mother\'s Name:');
			doc.text(55, 45, nationality);
			doc.text(10, 45, '4. Nationality:');
			doc.text(10, 55, '5. Courses Taken:');
			doc.setFontSize(12);
			doc.text(50, 65, course1 +', ');
			doc.text(70, 65, course2 +', ');
			doc.text(90, 65, course3 +', ');
			doc.text(110, 65, course4 +', ');
			doc.text(130, 65, course5 +', ');
			doc.text(150, 65, course6 +', ');
			doc.text(170, 65, course7 +', ');
			doc.text(190, 65, course8);
			doc.setFontSize(16);
			doc.text(20, 65, 'I) Regular:');
			doc.text(20, 75, 'II) Self Study:');
			doc.text(10, 85, '6. Full description of the punishment given during exam (if any):');
			doc.text(17, 98, '........');
			doc.text(17, 103, 'Date');
			doc.text(136, 98, '....................................');
			doc.text(136, 103, 'Signature of Examinee');
			doc.text(17, 114, 'Applicant Should Pay '+ amount +' (tk) to University through Bank.');
			doc.text(17, 130, '........');
			doc.text(17, 135, 'Date');
			doc.text(135, 130, '......................................');
			doc.text(135, 135, 'Signature of Accountant');
			doc.text(0, 140, '........................................................................................................................................................');
			
			doc.text(75, 150, 'Rules & Regulations');
			doc.text(75, 153, '.................................');
			doc.text(10, 163, 'Rules of taking steps against practising unfairmeans in exam:');
			doc.text(10, 173, 'Following actions will be considered to be unfair in exam hall:');
			doc.text(10, 183, '(a) Talking with another examinee in the exam hall.');
			doc.text(10, 193, '(b) Keeping cell phone in the exam hall.');
			doc.text(10, 203, '(c) Smoking in the exam hall.');
			doc.text(10, 213, '(d) Keeping illegal papers.');
			doc.text(10, 223, '(e) Copying from illegal papers or other examinee.');
			doc.text(10, 233, '(f) Misbehaving with or threatening to any invigilator or stuff.');
			doc.text(10, 243, '(g) Keeping any book or paper in toilet.');
			doc.text(10, 253, '(h) Any other action that is considered to be crime by the invigilators.');
			doc.text(10, 263, 'Student committing any of the given miscreants can be expelled from the hall');
			doc.text(10, 273, 'or expelled and restricted from giving all other exam.');
			doc.text(150, 279, '.....................');
			doc.text(150, 284, ' Comptroller ');
			doc.text(150, 290, '     CUET ');

			var data = doc.output();
			var writeStream = fs.createWriteStream('./public/download/admitCard(' + id + ').pdf');
			writeStream.write(data);
			writeStream.end();
		}();

		var moneyReceipt = function() {
			var doc = new jsPDF();
			doc.setLineWidth(.7);
			doc.line(10, 125, 10, 238); // vertical line
			doc.line(80, 125, 80, 238); // vertical line
			doc.line(100, 125, 100, 238); // vertical line
			doc.line(115, 125, 115, 238); // vertical line
			doc.line(185, 125, 185, 238); // vertical line
			doc.line(205, 125, 205, 238); // vertical line
			doc.setFontType('bold');
			doc.text(8, 10, 'Chittagong University of Engineering');
			doc.text(55, 16, '&')
			doc.text(43, 21, 'Technology');
			doc.setFontType('normal');
			doc.text(10, 30, 'Money Receipt');
			doc.text(10, 40, 'Bank Copy (1)');

			doc.setFontSize(13);
			doc.text(50, 50, name);
			doc.text(50,60, id);
			doc.text(50,70, departmentName);

			doc.text(155, 50, name);
			doc.text(155, 60, id);
			doc.text(155, 70, departmentName);

			doc.setFontSize(16);
			doc.text(10, 50, 'Name: ');
			doc.text(10, 60, 'ID No: ');
			doc.text(10, 70, 'Dept: ');
			doc.text(10, 80, 'Level: 3');
			doc.text(10, 90, 'Term: I');
			doc.text(10, 100, 'Session: 1982-83');
			doc.text(10, 110, 'Submission Date: ');
			doc.line(10, 115, 100, 115); // horizontal line
			doc.text(30, 121, 'ACC No: 34129302');
			doc.line(10, 123, 100, 123);
			doc.line(10, 125, 100, 125);
			doc.text(30, 130, 'Description');
			doc.text(82, 131, 'TAKA');
			doc.line(10, 133, 100, 133);
			doc.text(12, 138, 'Student fees');
			doc.line(10, 141, 100, 141);
			doc.text(12, 146, 'Admission fees');
			doc.line(10, 149, 100, 149);
			doc.text(12, 154, 'Bus rent');
			doc.line(10, 157, 100, 157);
			doc.text(12, 162, 'Student welfare fees');
			doc.line(12, 165, 100, 165);
			doc.text(12, 170, 'Religious program');
			doc.line(10, 173, 100, 173);
			doc.text(12, 178, 'Library fees');
			doc.line(10, 181, 100, 181);
			doc.text(12, 186, 'Convocation');
			doc.line(10, 189, 100, 189);
			doc.text(12, 194, 'Medical fees');
			doc.line(10, 197, 100, 197);
			doc.text(12, 202, 'Registration');
			doc.text(82, 202, amount);
			doc.line(10, 205, 100, 205);
			doc.text(12, 210, 'Character certificate');
			doc.line(10, 213, 100, 213);
			doc.text(12, 218, 'Course duration certificate');
			doc.line(10, 220, 100, 220);
			doc.text(12, 225, 'Donation');
			doc.text(82, 225, donation);
			doc.line(10, 228, 100, 228);
			doc.line(10, 230, 100, 230);
			doc.text(12, 235, 'Total amount');
			doc.text(82, 235, totalAmount);
			doc.line(10, 238, 100, 238);
			doc.text(10, 248, 'Signature')
			doc.text(15, 260, '.............');
			doc.text(15, 265, 'Student');
			doc.text(75, 260, '.............');
			doc.text(75, 265, 'Cashier');
			
			doc.setFontType('bold');
			doc.text(110, 10, 'Chittagong University of Engineering');
			doc.text(155, 16, '&')
			doc.text(143, 21, 'Technology');
			doc.setFontType('normal');
			doc.text(115, 30, 'Money Receipt');
			doc.text(115, 40, 'Bank Copy (2)');
			doc.text(115, 50, 'Name: ')
			doc.text(115, 60, 'ID No: ');
			doc.text(115, 70, 'Dept: ');
			doc.text(115, 80, 'Level: 3');
			doc.text(115, 90, 'Term: I');
			doc.text(115, 100, 'Session: 1982-83');
			doc.text(115, 110, 'Submission Date: ');
			doc.line(115, 115, 205, 115); // horizontal line
			doc.text(135, 121, 'ACC No: 34129302');
			doc.line(115, 123, 205, 123);
			doc.line(115, 125, 205, 125);
			doc.text(135, 130, 'Description');
			doc.text(187, 131, 'TAKA');
			doc.line(115, 133, 205, 133);
			doc.text(117, 138, 'Student fees');
			doc.line(115, 141, 205, 141);
			doc.text(117, 146, 'Admission fees');
			doc.line(115, 149, 205, 149);
			doc.text(117, 154, 'Bus rent');
			doc.line(115, 157, 205, 157);
			doc.text(117, 162, 'Student welfare fees');
			doc.line(115, 165, 205, 165);
			doc.text(117, 170, 'Religious program');
			doc.line(115, 173, 205, 173);
			doc.text(117, 178, 'Library fees');
			doc.line(115, 181, 205, 181);
			doc.text(117, 186, 'Convocation');
			doc.line(115, 189, 205, 189);
			doc.text(117, 194, 'Medical fees');
			doc.line(115, 197, 205, 197);
			doc.text(117, 202, 'Registration');
			doc.text(187, 202, amount);
			doc.line(115, 205, 205, 205);
			doc.text(117, 210, 'Character certificate');
			doc.line(115, 213, 205, 213);
			doc.text(117, 218, 'Course duration certificate');
			doc.line(115, 220, 205, 220);
			doc.text(117, 225, 'Donation');
			doc.text(187, 225, donation);
			doc.line(115, 228, 205, 228);
			doc.line(115, 230, 205, 230);
			doc.text(117, 235, 'Total amount');
			doc.text(187, 235, totalAmount);
			doc.line(115, 238, 205, 238);
			doc.text(115, 248, 'Signature')
			doc.text(120, 260, '.............');
			doc.text(120, 265, 'Student');
			doc.text(175, 260, '.............');
			doc.text(175, 265, 'Cashier');

			doc.addPage();
			
			doc.setLineWidth(.7);
			doc.line(10, 125, 10, 238); // vertical line
			doc.line(80, 125, 80, 238); // vertical line
			doc.line(100, 125, 100, 238); // vertical line
			doc.line(115, 125, 115, 238); // vertical line
			doc.line(185, 125, 185, 238); // vertical line
			doc.line(205, 125, 205, 238); // vertical line
			doc.setFontType('bold');
			doc.text(8, 10, 'Chittagong University of Engineering');
			doc.text(55, 16, '&')
			doc.text(43, 21, 'Technology');
			doc.setFontType('normal');

			doc.setFontSize(13);
			doc.text(50, 50, name);
			doc.text(50, 60, id);
			doc.text(50, 70, departmentName);

			doc.text(155, 50, name);
			doc.text(155, 60, id);
			doc.text(155, 70, departmentName);

			doc.setFontSize(16);
			doc.setFontType('normal');
			doc.text(10, 30, 'Money Receipt');
			doc.text(10, 40, 'Academic Copy');
			doc.text(10, 50, 'Name: ')
			doc.text(10, 60, 'ID No: ');
			doc.text(10, 70, 'Dept: ');
			doc.text(10, 80, 'Level: 3');
			doc.text(10, 90, 'Term: I');
			doc.text(10, 100, 'Session: 1982-83');
			doc.text(10, 110, 'Submission Date: ');
			doc.line(10, 115, 100, 115); // horizontal line
			doc.text(30, 121, 'ACC No: 34129302');
			doc.line(10, 123, 100, 123);
			doc.line(10, 125, 100, 125);
			doc.text(30, 130, 'Description');
			doc.text(82, 131, 'TAKA');
			doc.line(10, 133, 100, 133);
			doc.text(12, 138, 'Student fees');
			doc.line(10, 141, 100, 141);
			doc.text(12, 146, 'Admission fees');
			doc.line(10, 149, 100, 149);
			doc.text(12, 154, 'Bus rent');
			doc.line(10, 157, 100, 157);
			doc.text(12, 162, 'Student welfare fees');
			doc.line(12, 165, 100, 165);
			doc.text(12, 170, 'Religious program');
			doc.line(10, 173, 100, 173);
			doc.text(12, 178, 'Library fees');
			doc.line(10, 181, 100, 181);
			doc.text(12, 186, 'Convocation');
			doc.line(10, 189, 100, 189);
			doc.text(12, 194, 'Medical fees');
			doc.line(10, 197, 100, 197);
			doc.text(12, 202, 'Registration');
			doc.text(82, 202, amount);
			doc.line(10, 205, 100, 205);
			doc.text(12, 210, 'Character certificate');
			doc.line(10, 213, 100, 213);
			doc.text(12, 218, 'Course duration certificate');
			doc.line(10, 220, 100, 220);
			doc.text(12, 225, 'Donation');
			doc.text(82, 225, donation);
			doc.line(10, 228, 100, 228);
			doc.line(10, 230, 100, 230);
			doc.text(12, 235, 'Total amount');
			doc.text(82, 235, totalAmount);
			doc.line(10, 238, 100, 238);
			doc.text(10, 248, 'Signature')
			doc.text(15, 260, '.............');
			doc.text(15, 265, 'Student');
			doc.text(75, 260, '.............');
			doc.text(75, 265, 'Cashier');
			
			doc.setFontType('bold');
			doc.text(110, 10, 'Chittagong University of Engineering');
			doc.text(155, 16, '&')
			doc.text(143, 21, 'Technology');
			doc.setFontType('normal');
			doc.text(115, 30, 'Money Receipt');
			doc.text(115, 40, 'Student Copy');
			doc.text(115, 50, 'Name: ')
			doc.text(115, 60, 'ID No: ');
			doc.text(115, 70, 'Dept: ');
			doc.text(115, 80, 'Level: 3');
			doc.text(115, 90, 'Term: I');
			doc.text(115, 100, 'Session: 1982-83');
			doc.text(115, 110, 'Submission Date: ');
			doc.line(115, 115, 205, 115); // horizontal line
			doc.text(135, 121, 'ACC No: 34129302');
			doc.line(115, 123, 205, 123);
			doc.line(115, 125, 205, 125);
			doc.text(135, 130, 'Description');
			doc.text(187, 131, 'TAKA');
			doc.line(115, 133, 205, 133);
			doc.text(117, 138, 'Student fees');
			doc.line(115, 141, 205, 141);
			doc.text(117, 146, 'Admission fees');
			doc.line(115, 149, 205, 149);
			doc.text(117, 154, 'Bus rent');
			doc.line(115, 157, 205, 157);
			doc.text(117, 162, 'Student welfare fees');
			doc.line(115, 165, 205, 165);
			doc.text(117, 170, 'Religious program');
			doc.line(115, 173, 205, 173);
			doc.text(117, 178, 'Library fees');
			doc.line(115, 181, 205, 181);
			doc.text(117, 186, 'Convocation');
			doc.line(115, 189, 205, 189);
			doc.text(117, 194, 'Medical fees');
			doc.line(115, 197, 205, 197);
			doc.text(117, 202, 'Registration');
			doc.text(187, 202, amount);
			doc.line(115, 205, 205, 205);
			doc.text(117, 210, 'Character certificate');
			doc.line(115, 213, 205, 213);
			doc.text(117, 218, 'Course duration certificate');
			doc.line(115, 220, 205, 220);
			doc.text(117, 225, 'Donation');
			doc.text(187, 225, donation);
			doc.line(115, 228, 205, 228);
			doc.line(115, 230, 205, 230);
			doc.text(117, 235, 'Total amount');
			doc.text(187, 235, totalAmount);
			doc.line(115, 238, 205, 238);
			doc.text(115, 248, 'Signature')
			doc.text(120, 260, '.............');
			doc.text(120, 265, 'Student');
			doc.text(175, 260, '.............');
			doc.text(175, 265, 'Cashier');

			var data = doc.output();
			var writeStream = fs.createWriteStream('./public/download/moneyReceipt(' + id + ').pdf');
			writeStream.write(data);
			writeStream.end();
		}();

		var registrationForm = function () {
			var doc = new jsPDF();
			doc.setFontSize(22);
			doc.setFontType('bold');
			doc.text(11, 15, 'Chittagong University of Engineering & Technology');
			doc.setFontType('normal');
			doc.setFontSize(16);
			doc.text(80,25,'Chittagong - 4349');
			doc.text(70,35,'Course Registration Form');
			doc.setLineWidth(.8);
			doc.line(10, 100, 10, 215); // vertical line
			doc.line(54, 100, 54, 215); // vertical line
			doc.line(164, 100, 164, 215); // vertical line
			doc.line(200, 100, 200, 215); // vertical line
			
			doc.line(10, 40, 200, 40); // horizontal line
			doc.text(10, 52, 'Student No. ');
			doc.text(45, 51, '.................');
			doc.text(53, 56, 'Year');
			doc.text(53, 50, year);
			doc.text(75, 51, '..................');
			doc.text(75, 56, 'Dept. Code');
			doc.text(85, 50, code);
			doc.text(105, 51, '.................');
			doc.text(110, 56, 'Roll No');
			doc.text(112, 50, roll);
			doc.text(10, 68, 'Name of the Student: ');
			doc.text(70, 68, name);
			doc.text(50, 78, departmentName);
			doc.text(10, 78, 'Department:');
			doc.text(70, 78, 'Level:		3');
			doc.text(110, 78, 'Term:		I');
			doc.text(150, 78, 'Session:	1982-83');
			doc.line(10, 81, 200, 81); // horizontal line
			doc.text(10, 91, 'Name of the Hall: ');
			doc.text(70, 91, hallName);
			doc.line(10, 100, 200, 100); // horizontal line
			doc.text(20, 110, 'Course No');
			doc.text(20, 122, course1);
			doc.text(20, 132, course2);
			doc.text(20, 142, course3);
			doc.text(20, 152, course4);
			doc.text(20, 162, course5);
			doc.text(20, 172, course6);
			doc.text(20, 182, course7);
			doc.text(20, 192, course8);
			doc.text(90, 110, 'Course Title');
			doc.setFontSize(10);
			doc.text(57, 122, course1Title);
			doc.text(57, 133, course2Title);
			doc.text(57, 142, course3Title);
			doc.text(57, 152, course4Title);
			doc.text(57, 161, course5Title);
			doc.text(57, 171, course6Title);
			doc.text(57, 181, course7Title);
			doc.text(57, 192, course8Title);
			doc.setFontSize(16);
			doc.text(167, 110, 'Credit Hours');
			doc.text(177, 122, credit1);
			doc.text(177, 132, credit2);
			doc.text(177, 142, credit3);
			doc.text(177, 152, credit4);
			doc.text(177, 162, credit5);
			doc.text(177, 172, credit6);
			doc.text(177, 182, credit7);
			doc.text(177, 192, credit8);
			doc.line(10, 115, 200, 115); // horizontal line
			doc.line(10, 125, 200, 125); // horizontal line
			doc.line(10, 135, 200, 135); // horizontal line
			doc.line(10, 145, 200, 145); // horizontal line
			doc.line(10, 155, 200, 155); // horizontal line
			doc.line(10, 165, 200, 165); // horizontal line
			doc.line(10, 175, 200, 175); // horizontal line
			doc.line(10, 185, 200, 185); // horizontal line
			doc.line(10, 195, 200, 195); // horizontal line
			doc.line(10, 205, 200, 205); // horizontal line
			doc.line(10, 215, 200, 215); // horizontal line
			doc.text(10, 230, 'Credit Hours Taken(Current Term) ');
			doc.text(105, 230, totalCredit);
			doc.rect(100, 223, 25, 10); // empty square
			//doc.text(105, 232,'.................');
			doc.text(140, 245, '........................................');
			doc.text(140, 251, 'Signature of the Student');
			doc.text(140, 258, 'Date: ');
			doc.text(20, 280, '............')
			doc.text(20, 285, 'Provost');
			doc.text(90, 280, '............');
			doc.text(90, 285, 'Advisor');
			doc.text(160, 280, '..........');
			doc.text(160, 285, 'Head');

			var data = doc.output();
			var writeStream = fs.createWriteStream('./public/download/registrationForm(' + id + ').pdf');
			writeStream.write(data);
			writeStream.end();
		}();
	});
	//console.log('Successfully generated pdf files');
}

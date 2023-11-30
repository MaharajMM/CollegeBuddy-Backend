const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const marksheetSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  subjects: [
    {
      subjectCode: String,
      subjectName: String,
      grade: String,
    },
  ],
  sgpa: {
    type: Number,
    required: true,
  },
});

const Marksheet = mongoose.model("Marksheet", marksheetSchema);

module.exports = Marksheet;
/*

{
    "message": "success",
  
            "student": {
                "_id": "655e34355351497446e1c324",
                "name": "John Doe",
                "email": "john.doe@example.com",
                "rollNo": "R12345",
                "registrationNo": 2001331046,
                "phoneNo": 1234567890,
                "session": "2023-2024",
                "branch": "CSE",
                "dob": "1990-01-01T00:00:00.000Z",
                "profilePicture": null,
                "__v": 0
            },
    "marksheet": [
        {
            "_id": "6568c8d3d96f7536d254b3d7",
            
            "semester": 6,
            "subjects": [
                {
                    "subjectCode": "CS101",
                    "subjectName": "Computer Science",
                    "grade": "O",
                    "_id": "6568c8d3d96f7536d254b3d8"
                },
                {
                    "subjectCode": "MATH202",
                    "subjectName": "Advanced Mathematics",
                    "grade": "E",
                    "_id": "6568c8d3d96f7536d254b3d9"
                }
            ],
            "sgpa": 8.2,
            "__v": 0
        },
        {
             "_id": "6568c932d96f7536d254b3df",
           
            "semester": 3,
            "subjects": [
                {
                    "subjectCode": "CS101",
                    "subjectName": "Control System",
                    "grade": "A",
                    "_id": "6568c932d96f7536d254b3e0"
                },
                {
                    "subjectCode": "RPGS202",
                    "subjectName": "RPGS",
                    "grade": "E",
                    "_id": "6568c932d96f7536d254b3e1"
                }
            ],
            "sgpa": 8.33,
            "__v": 0
        }
    ]
}

*/

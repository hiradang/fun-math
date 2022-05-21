use funmath;

-- Course
INSERT INTO courses (course_id, course_name, question_all_count)
VALUES (1, "Phép cộng", 5);

INSERT INTO courses (course_id, course_name, question_all_count)
VALUES (2, "Phép trừ", 0);

INSERT INTO courses (course_id, course_name, question_all_count)
VALUES (3, "Phép nhân", 0);

INSERT INTO courses (course_id, course_name, question_all_count)
VALUES (4, "Phép chia", 0);

-- Chapter
INSERT INTO chapters (chapter_id, chapter_name, question_all_count, course_id)
VALUES (1, "Chương 1", 5, 1);

INSERT INTO chapters (chapter_id, chapter_name, question_all_count, course_id)
VALUES (2, "Chương 2", 0, 1);

INSERT INTO chapters (chapter_id, chapter_name, question_all_count, course_id)
VALUES (3, "Chương 3", 0, 1);

INSERT INTO chapters (chapter_id, chapter_name, question_all_count, course_id)
VALUES (4, "Chương 4", 0, 1);

INSERT INTO chapters (chapter_id, chapter_name, question_all_count, course_id)
VALUES (5, "Chương 5", 0, 1);

-- User

INSERT INTO users (username, password, role_id, name, profile_photo_path, current_course_id, total_exp, is_new_course_noti, is_new_chapter_noti)
VALUES ("binhdang", "$2b$10$oBJRzu3lSpfo0m711zMGgeeJF3g/CbEHS.dY0IbyqYtMFUvMzAKXy", 0, "Đặng Thị Bình", 
"https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/binhdang?alt=media&token=5f798c1f-4e0c-478d-bb35-1e7af7e9b416", 
 1,0, false, false);

INSERT INTO users (username, password, role_id, name, profile_photo_path, current_course_id, total_exp, is_new_course_noti, is_new_chapter_noti)
VALUES ("loanbui", "$2b$10$oBJRzu3lSpfo0m711zMGgeeJF3g/CbEHS.dY0IbyqYtMFUvMzAKXy", 0, "Bùi Thị Út Loan", 
"https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/loanbui?alt=media&token=d9f39c37-dc5a-4c54-96e0-7112c207fb80", 
 1, 0, false, false);

INSERT INTO users (username, password, role_id, name, profile_photo_path, current_course_id, total_exp, is_new_course_noti, is_new_chapter_noti)
VALUES ("maihoa", "$2b$10$oBJRzu3lSpfo0m711zMGgeeJF3g/CbEHS.dY0IbyqYtMFUvMzAKXy", 0, "Đặng Thị Thanh Hoa", 
"https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/maihoa?alt=media&token=4f162103-a54d-4142-ae02-c10ba03c6b8b", 
 1, 0, false, false);

INSERT INTO users (username, password, role_id, name, profile_photo_path, current_course_id, total_exp, is_new_course_noti, is_new_chapter_noti)
VALUES ("maihuy", "$2b$10$oBJRzu3lSpfo0m711zMGgeeJF3g/CbEHS.dY0IbyqYtMFUvMzAKXy", 0, "Trịnh Mai Huy", 
"https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/defaultProfileImage.png?alt=media&token=790800d6-aac7-4359-a541-e73b3348e3cb", 
 1, 0, false, false);

INSERT INTO users (username, password, role_id, name, profile_photo_path, current_course_id, total_exp, is_new_course_noti, is_new_chapter_noti)
VALUES ("minhhuong", "$2b$10$oBJRzu3lSpfo0m711zMGgeeJF3g/CbEHS.dY0IbyqYtMFUvMzAKXy", 0, "Lê Minh Hương", 
"https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/minhhuong?alt=media&token=8093454e-5977-4271-b43d-9d89ccabb4e7", 
 1, 0, false, false);

INSERT INTO users (username, password, role_id, name, profile_photo_path, current_course_id, total_exp, is_new_course_noti, is_new_chapter_noti)
VALUES ("admin", "$2b$10$oBJRzu3lSpfo0m711zMGgeeJF3g/CbEHS.dY0IbyqYtMFUvMzAKXy", "1", "Admin", 
"https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/defaultProfileImage.png?alt=media&token=790800d6-aac7-4359-a541-e73b3348e3cb", 
 1, 0, false, false);

INSERT INTO users (username, password, role_id, name, profile_photo_path, current_course_id, total_exp)
VALUES ("admin", "$2b$10$oBJRzu3lSpfo0m711zMGgeeJF3g/CbEHS.dY0IbyqYtMFUvMzAKXy", 1, "Admin", 
"https://thumbs.dreamstime.com/b/rottweiler-198912637.jpg", 
"Phép cộng", 1, 100);


-- Chapter_User

INSERT INTO chapter_users (chapter_id, is_done, username)
VALUES (1, false, "binhdang");

INSERT INTO chapter_users (chapter_id, is_done, username)
VALUES (2, false, "binhdang");

INSERT INTO chapter_users (chapter_id, is_done, username)
VALUES (3, false, "binhdang");

INSERT INTO chapter_users (chapter_id, is_done, username)
VALUES (4, false, "binhdang");

INSERT INTO chapter_users (chapter_id, is_done, username)
VALUES (5, false, "binhdang");

INSERT INTO chapter_users (chapter_id, is_done, username)
VALUES (1, false, "loanbui");

INSERT INTO chapter_users (chapter_id, is_done, username)
VALUES (2, false, "loanbui");

INSERT INTO chapter_users (chapter_id, is_done, username)
VALUES (3, false, "loanbui");

INSERT INTO chapter_users (chapter_id, is_done, username)
VALUES (4, false, "loanbui");

INSERT INTO chapter_users (chapter_id, is_done, username)
VALUES (5, false, "loanbui");

-- Course_User
INSERT INTO course_users (course_id, username, current_chapter, question_learnt_count, is_done, total_exp)
VALUES (1, "binhdang", 1, 0, False, 0);

INSERT INTO course_users (course_id, username, current_chapter, question_learnt_count, is_done, total_exp)
VALUES (2, "binhdang", 1, 0, False, 0);

INSERT INTO course_users (course_id, username, current_chapter, question_learnt_count, is_done, total_exp)
VALUES (3, "binhdang", 1, 0, False, 0);

INSERT INTO course_users (course_id, username, current_chapter, question_learnt_count, is_done, total_exp)
VALUES (4, "binhdang", 1, 0, False, 0);

INSERT INTO course_users (course_id, username, current_chapter, question_learnt_count, is_done, total_exp)
VALUES (1, "loanbui", 1, 0, False, 0);

INSERT INTO course_users (course_id, username, current_chapter, question_learnt_count, is_done, total_exp)
VALUES (2, "loanbui", 1, 0, False, 0);

INSERT INTO course_users (course_id, username, current_chapter, question_learnt_count, is_done, total_exp)
VALUES (3, "loanbui", 1, 0, False, 0);

INSERT INTO course_users (course_id, username, current_chapter, question_learnt_count, is_done, total_exp)
VALUES (4, "loanbui", 1, 0, False, 0);



-- Questions 

insert into questions (question_name, chapter_id, question_image) values ("1 + 1", 1, 'https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/image_1.png?alt=media&token=afe0255d-e9e3-4b31-b68d-f19c8b6b06c4');
insert into questions (question_name, chapter_id, question_image) values ("1 + 2", 1, 'https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/image_1.png?alt=media&token=afe0255d-e9e3-4b31-b68d-f19c8b6b06c4');
insert into questions (question_name, chapter_id, question_image) values ("2 + 2", 1, 'https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/image_1.png?alt=media&token=afe0255d-e9e3-4b31-b68d-f19c8b6b06c4');
insert into questions (question_name, chapter_id, question_image) values ("2 + 3", 1, 'https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/image_1.png?alt=media&token=afe0255d-e9e3-4b31-b68d-f19c8b6b06c4');


-- Mutliple choice

insert into multichoice_questions (question, correct_answer, answers, format_question, question_image, question_id)
values ("Điền số nấm còn thiếu giúp bạn chó nhé!", 1, "1,2,3,4", "2+?=3", 'https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/question1.1.png?alt=media&token=3c2f9a5b-f7a3-45c9-b48b-4085b2a9658b',1);

insert into multichoice_questions (question, correct_answer, answers, format_question, question_image,question_id)
values ("Điền số nấm còn thiếu giúp bạn chó nhé!", 2, "1,2,3,4", "2+?=4", 'https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/question1.1.png?alt=media&token=3c2f9a5b-f7a3-45c9-b48b-4085b2a9658b',2);


insert into multichoice_questions (question, correct_answer, answers, format_question, question_image,question_id)
values ("Điền số nấm còn thiếu giúp bạn chó nhé!", 1, "1,2,3,4", "3+?=4",'https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/question1.1.png?alt=media&token=3c2f9a5b-f7a3-45c9-b48b-4085b2a9658b', 3);


insert into multichoice_questions (question, correct_answer, answers, format_question, question_image,question_id)
values ("Điền số nấm còn thiếu giúp bạn chó nhé!", 0, "1,2,3,0", "2+?=2", 'https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/question1.1.png?alt=media&token=3c2f9a5b-f7a3-45c9-b48b-4085b2a9658b',4);

-- type question

INSERT INTO `type_questions`( `question`, `correct_answer`, `format_question`, `question_name` ,`question_id`) VALUES ('Loan có 2 cái kẹo, Bình cho Loan thêm 1 cái nữa. Hỏi Loan có mấy cái kẹo?', '1', '2+?=3', 'Đọc và hoàn thành phép toán', 1);

INSERT INTO `type_questions`( `question`, `correct_answer`, `format_question`, `question_name` ,`question_id`) VALUES ('Loan có 2 cái kẹo, Bình cho Loan thêm 2 cái nữa. Hỏi Loan có mấy cái kẹo?', '2,4', '2+?=?', 'Đọc và hoàn thành phép toán', 2);

INSERT INTO `type_questions`( `question`, `correct_answer`, `format_question`, `question_name` ,`question_id`) VALUES ('Loan có 3 cái kẹo, Bình cho Loan thêm 1 cái nữa. Hỏi Loan có mấy cái kẹo?', '3,4', '?+1=?', 'Đọc và hoàn thành phép toán', 3);

INSERT INTO `type_questions`( `question`, `correct_answer`, `format_question`, `question_name` ,`question_id`) VALUES ('Loan có 2 cái kẹo, Bình cho Loan thêm 0 cái nữa. Hỏi Loan có mấy cái kẹo?', '0,2', '2+?=?', 'Đọc và hoàn thành phép toán', 4);

-- trigger update_exp
CREATE TRIGGER `update_exp` AFTER UPDATE ON `course_users`
 FOR EACH ROW UPDATE users SET total_exp = total_exp + new.total_exp - old.total_exp WHERE username = new.username;

CREATE TRIGGER `addQuestion` AFTER INSERT ON `questions` FOR EACH ROW UPDATE chapters 
SET question_all_count = question_all_count + 1 WHERE chapter_id = new.chapter_id;

CREATE TRIGGER `addQuestionCourse` AFTER UPDATE ON `chapters` FOR EACH ROW UPDATE courses 
SET question_all_count = question_all_count + new.question_all_count - old.question_all_count 
WHERE course_id = new.course_id;

CREATE TRIGGER `deleteQuestion` AFTER DELETE ON `questions` FOR EACH ROW UPDATE chapters 
SET question_all_count = question_all_count - 1 WHERE chapter_id = old.chapter_id;

CREATE TRIGGER `deleteChapter_user` AFTER DELETE ON `chapters`
 FOR EACH ROW DELETE from chapter_users WHERE chapter_id = old.chapter_id;

 CREATE TRIGGER `deleteChapter` AFTER DELETE ON `chapters`
 FOR EACH ROW DELETE from questions WHERE chapter_id = old.chapter_id;

 CREATE TRIGGER `deleteMultiChoice` AFTER DELETE ON `questions`
 FOR EACH ROW DELETE from multichoice_questions WHERE question_id = old.question_id;

 CREATE TRIGGER `deleteTypeQuestion` AFTER DELETE ON `questions`
 FOR EACH ROW DELETE from type_questions WHERE question_id = old.question_id;

 CREATE TRIGGER `deleteCourse` AFTER DELETE ON `courses`
 FOR EACH ROW DELETE from chapters WHERE course_id = old.course_id;

 CREATE TRIGGER `deleteCourse_User` AFTER UPDATE ON `courses`
 FOR EACH ROW DELETE from course_users WHERE course_id = old.course_id;

 CREATE TRIGGER `insertChapter` AFTER INSERT ON `chapters`
 FOR EACH ROW UPDATE course_users set is_done = 0 WHERE course_id = new.course_id;
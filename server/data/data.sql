use funmath;

-- Course_User
INSERT INTO course_users (course_id, username, course_name, current_chapter, question_all_count, question_learnt_count, is_done, total_exp)
VALUES (4, "binhdang", "Phép chia",  1, 100, 0, False, 0);


-- Course
INSERT INTO courses (course_id, course_name)
VALUES (1, "Phép cộng");

-- Chapter

INSERT INTO chapter_users (chapter_id, chapter_name, is_done, course_id, username)
VALUES (1, "Chương 1", true, 1, "binhdang");

INSERT INTO chapter_users (chapter_id, chapter_name, is_done, course_id, username)
VALUES (2, "Chương 2", true, 1, "binhdang");

-- User

INSERT INTO users (username, password, role_id, name, profile_photo_path, current_course_name, current_course_id, total_exp)
VALUES ("binhdang", "$2b$10$oBJRzu3lSpfo0m711zMGgeeJF3g/CbEHS.dY0IbyqYtMFUvMzAKXy", 0, "Đặng Thị Bình", 
"https://png.pngtree.com/png-clipart/20201223/ourlarge/pngtree-cat-technology-sense-cat-avatar-png-image_2591263.jpg", 
"Phép cộng", 1, 1000);

INSERT INTO users (username, password, role_id, name, profile_photo_path, current_course_name, current_course_id, total_exp)
VALUES ("loanbui", "$2b$10$oBJRzu3lSpfo0m711zMGgeeJF3g/CbEHS.dY0IbyqYtMFUvMzAKXy", 0, "Bùi Thị Út Loan", 
"https://thumbs.dreamstime.com/b/rottweiler-198912637.jpg", 
"Phép cộng", 1, 100);

INSERT INTO users (username, password, role_id, name, profile_photo_path, current_course_name, current_course_id, total_exp)
VALUES ("maihoa", "$2b$10$oBJRzu3lSpfo0m711zMGgeeJF3g/CbEHS.dY0IbyqYtMFUvMzAKXy", 0, "Đặng Thị Thanh Hoa", 
"https://thumbs.dreamstime.com/b/giraffe-avatar-wearing-suit-illustration-cartoon-45383618.jpg", 
"Phép cộng", 1, 200);

INSERT INTO users (username, password, role_id, name, profile_photo_path, current_course_name, current_course_id, total_exp)
VALUES ("maihuy", "$2b$10$oBJRzu3lSpfo0m711zMGgeeJF3g/CbEHS.dY0IbyqYtMFUvMzAKXy", 0, "Trịnh Mai Huy", 
"https://png.pngtree.com/png-vector/20191027/ourlarge/pngtree-cute-tiger-avatar-with-a-yellow-background-png-image_1873462.jpg", 
"Phép cộng", 1, 400);

INSERT INTO users (username, password, role_id, name, profile_photo_path, current_course_name, current_course_id, total_exp)
VALUES ("minhhuong", "$2b$10$oBJRzu3lSpfo0m711zMGgeeJF3g/CbEHS.dY0IbyqYtMFUvMzAKXy", 0, "Lê Minh Hương", 
"https://allimages.sgp1.digitaloceanspaces.com/tipeduvn/2022/02/50-Anh-Meo-Cute-Ngau-Hinh-Avatar-Meo-De-Thuong.jpg", 
"Phép cộng", 1, 500);
import { StyleSheet, Text, View, ScrollView, TextInput, Dimensions, Image } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../../../utils/CustomButton';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window');
function removeVietnameseTones(str) {
  if (str === null || str === undefined) return str;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  return str;
}
function isVietnamese(str) {
  var re = /^[a-zA-Z0-9!%?)( +=:,.-]{2,}$/g; // regex here
  return re.test(removeVietnameseTones(str));
}

function isFormatQuestion(str) {
  var re = /^[x0-9?)(+=:-]{2,}$/g; // regex here
  return re.test(str);
}

function isAnswers(str) {
  var re = /^[0-9)(,]{2,}$/g; // regex here
  return re.test(str);
}

function isNumber(str) {
  var reg = /^\d+$/;
  return reg.test(str);
}

export default function LessonForm({submitCourseFunction, objId}) {
  // Form này dùng cho cả add và edit nếu add thì
  // objId gồm 3 cái id khóa học, chương và bài học muốn sửa
  // ko cần lấy ID để fetch data => Nếu là màn hình thêm mới bài học sẽ ko truyền objId
  // nếu nta edit thì sẽ truyền, nên nếu objId ko truyền gì thì Loan mấy cái state dưới này cứ để trống như t đang để
  // Còn nếu có objId thì phải fetch data rồi cho vào các state
  // Hơi phắc tạp 1 tí nma t đã cố gắng làm có thể để 1 cái dùng cho 2 nơi :<
  // お願いします

  // state cho question name
  const [questionName, setQuestionName] = useState('');

  // state cho img
  // cái này t mới cho giao diện 1 chỗ để render và 1 button để load ảnh lên
  // Loan làm thì xem lưu state cái ảnh như nào nhé

  // state cho trắc nghiệm
  const [multiChoice, setMultichoice] = useState({
    title: '',
    question: '',
    format: '',
    answers: '',
    correct: '',
  });

  // state cho tự luận
  const [fillBox, setFillBox] = useState({
    title: '',
    question: '',
    format: '',
    correct: '',
  });

  const checkFullFilled = () => {
    for (let i in multiChoice) {
      if (multiChoice[i].length === 0) return false;
    }

    for (let i in fillBox) {
      if (fillBox[i].length === 0) return false;
    }

    if (questionName.length === 0) return false;

    // chỗ này viết thêm if nữa, nếu chưa có ảnh cx trả về false luôn Loan nhé

    return true;
  };

  const formatData = () => {
    for (let i in multiChoice) multiChoice[i] = multiChoice[i].trim();
    for (let i in fillBox) fillBox[i] = fillBox[i].trim();
    setQuestionName(questionName.trim());
  };

  const [isSubmit, setIsSubmit] = useState(false);

  const checkValid = (value, validateType) => {
    if (isSubmit) {
      if (value.length === 0) return false;

      if (validateType === 'text') return isVietnamese(value);
      else if (validateType === 'format') return isFormatQuestion(value);
      else if (validateType === 'number') return isNumber(value);
      else return isAnswers(value);
    } else return true;
  };

  const submitHandler = () => {
    setIsSubmit(true);
    if (checkFullFilled() === false) {
      Toast.show({
        type: 'disableToast',
        text1: 'Bạn chưa nhập đầy đủ các trường',
        visibilityTime: 2000,
      });
    } else {
      formatData();
      // Chỗ này truyền hết data vừa nhận, ảnh thì t ko xử lý nên ko biết truyền gì
      // Loan làm nếu truyền cái khác thì thêm vào nhá
      submitCourse(questionName, multiChoice, fillBox);
    }
  };

  return (
    <ScrollView style={styles.formContainer}>
      <View style={styles.wrapper}>
        <Text style={styles.TileText}>Tên bài học</Text>
        <TextInput
          style={checkValid(questionName, 'text') ? styles.input : styles.inputInvalid}
          placeholder="Nhập tên bài học"
          value={questionName}
          onChangeText={(value) => setQuestionName(value)}
        />
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.TileText}>Ảnh bài học</Text>
        <Image
          style={styles.image}
          source={{
            uri: 'https://br.atsit.in/vi/wp-content/uploads/2022/01/attack-on-titan-season-4-part-2-ngay-phat-hanh-va-so-tap.jpg',
          }}
        />
        <CustomButton
          text="Upload"
          textStyles={{ color: 'black', marginRight: 10, marginLeft: 0, fontSize: 16 }}
          buttonStyles={{
            borderRadius: 10,
            backgroundColor: 'white',
            width: 120,
            height: 40,
            marginTop: 10,
            marginLeft: width * 0.5 - 120 / 2 - 20,
          }}
          pos="right"
          iconName="arrow-circle-o-up"
          iconSize={24}
          iconColor="black"
          //   onPressFunc={}
        />
      </View>
      <Text style={styles.typeText}>Dạng trắc nghiệm</Text>

      <View style={styles.wrapper}>
        <Text style={styles.TileText}>Tiêu đề</Text>
        <TextInput
          style={checkValid(multiChoice.title, 'text') ? styles.input : styles.inputInvalid}
          multiline
          placeholder="Nhập tiêu đề"
          value={multiChoice.title}
          onChangeText={(value) => (multiChoice.title = value)}
        />
      </View>

      <View style={styles.wrapper}>
        <Text style={styles.TileText}>Câu hỏi</Text>
        <TextInput
          style={checkValid(multiChoice.question, 'text') ? styles.input : styles.inputInvalid}
          multiline
          placeholder="Nhập câu hỏi"
          value={multiChoice.question}
          onChangeText={(value) => (multiChoice.question = value)}
        />
      </View>

      <View style={styles.wrapper}>
        <Text style={styles.TileText}>Định dạng</Text>
        <TextInput
          style={checkValid(multiChoice.format, 'format') ? styles.input : styles.inputInvalid}
          placeholder="Nhập định dạng"
          value={multiChoice.format}
          onChangeText={(value) => (multiChoice.format = value)}
        />
      </View>

      <View style={styles.wrapper}>
        <Text style={styles.TileText}>Đáp án</Text>
        <TextInput
          style={checkValid(multiChoice.answers, 'answers') ? styles.input : styles.inputInvalid}
          placeholder="Nhập đáp án"
          value={multiChoice.answers}
          onChangeText={(value) => (multiChoice.answers = value)}
        />
      </View>

      <View style={styles.wrapper}>
        <Text style={styles.TileText}>Đáp án đúng</Text>
        <TextInput
          style={checkValid(multiChoice.correct, 'number') ? styles.input : styles.inputInvalid}
          placeholder="Nhập đáp án đúng"
          value={multiChoice.correct}
          onChangeText={(value) => (multiChoice.correct = value)}
        />
      </View>

      <Text style={styles.typeText}>Dạng tự luận</Text>

      <View style={styles.wrapper}>
        <Text style={styles.TileText}>Tiêu đề</Text>
        <TextInput
          style={checkValid(fillBox.title, 'text') ? styles.input : styles.inputInvalid}
          multiline
          placeholder="Nhập tiêu đề"
          value={fillBox.title}
          onChangeText={(value) => (fillBox.title = value)}
        />
      </View>

      <View style={styles.wrapper}>
        <Text style={styles.TileText}>Câu hỏi</Text>
        <TextInput
          style={checkValid(fillBox.question, 'text') ? styles.input : styles.inputInvalid}
          multiline
          placeholder="Nhập câu hỏi"
          value={fillBox.question}
          onChangeText={(value) => (fillBox.question = value)}
        />
      </View>

      <View style={styles.wrapper}>
        <Text style={styles.TileText}>Định dạng</Text>
        <TextInput
          style={checkValid(fillBox.format, 'format') ? styles.input : styles.inputInvalid}
          placeholder="Nhập định dạng"
          value={fillBox.format}
          onChangeText={(value) => (fillBox.format = value)}
        />
      </View>

      <View style={styles.wrapper}>
        <Text style={styles.TileText}>Đáp án</Text>
        <TextInput
          style={checkValid(fillBox.correct, 'answers') ? styles.input : styles.inputInvalid}
          placeholder="Nhập đáp án"
          value={fillBox.correct}
          onChangeText={(value) => (fillBox.correct = value)}
        />
      </View>

      <CustomButton
        text="Submit"
        textStyles={{ color: 'white', marginRight: 12, marginLeft: 0, fontSize: 20 }}
        buttonStyles={{
          borderRadius: 10,
          backgroundColor: checkFullFilled() ? 'black' : '#C4C4C4',
          width: 160,
          height: 50,
          marginTop: 20,
          marginLeft: width * 0.5 - 160 / 2 - 20,
          marginBottom: 40,
        }}
        pos="right"
        iconName="upload"
        iconSize={24}
        iconColor="white"
        onPressFunc={submitHandler}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  wrapper: {
    display: 'flex',
    marginBottom: height * 0.02,
  },
  TileText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 10,
    backgroundColor: 'white',
    textAlign: 'left',
    fontSize: 20,
    paddingHorizontal: 15,
  },
  inputInvalid: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
    textAlign: 'left',
    fontSize: 20,
    paddingHorizontal: 15,

    borderWidth: 2,
    borderColor: '#ff3636',
  },
  image: {
    width: '100%',
    height: height * 0.3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCD4F3',
  },
  typeText: {
    textTransform: 'uppercase',
    fontSize: 20,
    color: '#CBD6FF',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: height * 0.01,
    marginBottom: height * 0.02,
  },
});

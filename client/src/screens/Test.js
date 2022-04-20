import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

function Test() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get(`http://192.168.3.103:3001/courses`).then((res) => {
      setCourses(res.data);
    });
  }, []);

  return (
    <View>
      <Text style={styles.text}>Hello</Text>

      <Text>These course name is fetch from server!</Text>
      {courses.map((course, index) => {
        return (
          <View>
            <Text>{course.title}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: '#999',
  },
});
export default Test;

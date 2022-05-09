import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';

// Giao diện của BXH sẽ hiển thị theo logic sau:
// - Nếu người dùng này trong top 3 BXH hiển thị như sau:
// 1. avatar abc 200
// 2. avatar abc 100
// 3. avatar user 90
//         ...
// - Nếu người dùng này ngoài top 3
// 1. avatar abc 200
// 2. avatar abc 100
// 3. avatar abc 90
// ab. avatar user 9
// Để đáp ứng điều kiện như trên thì data cho ranking table gồm:
// - Mảng chứa các object trong đó chứa: link avatar, name (tên người dùng), điểm, username (tên đăng nhập)
// - username người dùng hiện tại

export default function UserRanking({ dataExp, userName }) {
  let length = dataExp.length;
  const editedData = [];
  let userRank;

  const addRanking = (start, end) => {
    for (let i = start; i <= end; i++) {
      editedData[i] = { ...dataExp[i], rank: i + 1 };
    }
  };

  if (length > 0) {
    dataExp.sort(function (a, b) {
      return b.exp - a.exp;
    });

    const index = dataExp.findIndex((obj) => obj.userName === userName);
    if (index !== -1) userRank = index + 1;
  }

  if (length == 1) {
    editedData = [{ ...dataExp[0], rank: 1 }];
  } else if (length == 2) {
    addRanking(0, 1);
  } else if (length == 3) {
    addRanking(0, 2);
  } else {
    addRanking(0, 2);
    if (userRank > 3) editedData[3] = { ...dataExp[userRank - 1], rank: userRank };
  }

  length = editedData.length;

  return (
    <View style={styles.rankingContainer}>
      <View style={styles.rankingHeader}>
        <Text style={styles.headerText}>Bảng xếp hạng</Text>
      </View>
      {length == 0 && (
        <View style={styles.notUser}>
          <Text style={styles.status}>Hiện tại, chưa có người dùng nào tham gia khóa học</Text>
          <View style={styles.notUserIcon}>
            <Fontisto name="frowning" size={60} color="black" />
          </View>
        </View>
      )}
      {length > 0 &&
        editedData.map((data) => {
          if (data.userName === userName) {
            return (
              <View style={styles.rankCr} key={data.userName}>
                <View style={styles.avatar}>
                  <Image style={styles.avatarImg} source={{ uri: data.url }} />
                </View>
                <View style={styles.rankAndUser}>
                  <Text style={styles.rankAndUserTextCr} numberOfLines={1}>
                    {data.rank}. {data.name}
                  </Text>
                </View>
                <Text style={styles.expTextCr}>{data.exp}</Text>
              </View>
            );
          } else {
            return (
              <View style={styles.rank} key={data.userName}>
                <View style={styles.avatar}>
                  <Image style={styles.avatarImg} source={{ uri: data.url }} />
                </View>
                <View style={styles.rankAndUser}>
                  <Text style={styles.rankAndUserText} numberOfLines={1}>
                    {data.rank}. {data.name}
                  </Text>
                </View>
                <Text style={styles.expText}>{data.exp}</Text>
              </View>
            );
          }
        })}

      {length == 3 && (
        <>
          <View style={styles.moreIcon}>
            <Entypo name="dots-three-horizontal" size={30} color="#353CE1" />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rankingContainer: {
    flex: 0.56,
    width: '85%',
    backgroundColor: 'white',

    borderRadius: 19,
    elevation: 5,
  },
  rankingHeader: {
    height: '16%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  notUser: {
    height: '84%',
    padding: 20,
    alignItems: 'center',
  },
  status: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  notUserIcon: {
    flexDirection: 'row',
    marginTop: 20,
  },
  rank: {
    flex: 0.22,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,

    flexDirection: 'row',
    alignItems: 'center',

    borderTopWidth: 1,
    borderColor: '#DDDDDD',
  },
  rankCr: {
    flex: 0.22,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,

    flexDirection: 'row',
    alignItems: 'center',

    borderTopWidth: 1,
    borderColor: '#DDDDDD',

    backgroundColor: '#2b3648',
  },
  avatar: {
    flex: 0.2,
  },
  avatarImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  rankAndUser: {
    flex: 0.8,
  },
  rankAndUserText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#353CE1',
  },
  expText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#353CE1',
  },
  rankAndUserTextCr: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  expTextCr: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  moreIcon: {
    width: '100%',
    flex: 0.28,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

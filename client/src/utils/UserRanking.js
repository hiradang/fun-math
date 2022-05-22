import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import PropTypes from 'prop-types';

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

export default function UserRanking({ dataExp, userName, topExp }) {
  let length = dataExp.length;
  let userRank;
  let flexContainer = 0.56;
  const editedData = [];

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

    if (topExp == 3) {
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
    }

    if (topExp == 4) {
      flexContainer = 0.68;
      if (length == 1) {
        editedData = [{ ...dataExp[0], rank: 1 }];
      } else if (length == 2) {
        addRanking(0, 1);
      } else if (length == 3) {
        addRanking(0, 2);
      } else if (length == 4) {
        addRanking(0, 3);
      } else {
        addRanking(0, 3);
        if (userRank > 4) editedData[4] = { ...dataExp[userRank - 1], rank: userRank };
      }
    }

    length = editedData.length;
  }

  const renderMoreIcon = () => {
    if (topExp === 3) {
      return (
        <View style={{ ...styles.moreIcon, flex: 0.25 }}>
          <Entypo name="dots-three-horizontal" size={30} color="#353CE1" />
        </View>
      );
    }

    if (topExp === 4) {
      return (
        <View style={{ ...styles.moreIcon, flex: 0.18 }}>
          <Entypo name="dots-three-horizontal" size={30} color="#353CE1" />
        </View>
      );
    }
  };

  const headerRanking = () => {
    if (topExp === 3) {
      return (
        <View style={{ ...styles.rankingHeader, height: '16%' }}>
          <Text style={styles.headerText}>Bảng xếp hạng</Text>
        </View>
      );
    }

    if (topExp === 4) {
      return (
        <View style={{ ...styles.rankingHeader, height: '15%' }}>
          <Text style={styles.headerText}>Bảng xếp hạng</Text>
        </View>
      );
    }
  };

  return (
    <View style={{ ...styles.rankingContainer, flex: flexContainer }}>
      {headerRanking()}
      {length == 0 && notUserJoin()}
      {length > 0 &&
        editedData.map((data) => {
          if (data.userName === userName) {
            return (
              <View
                style={{
                  ...styles.rank,
                  backgroundColor: '#2b3648',
                  flex: topExp === 3 ? 0.22 : 0.18,
                }}
                key={data.userName}
              >
                {renderAvatar(data)}
                <View style={styles.rankAndUser}>
                  <Text style={{ ...styles.rankAndUserText, color: 'white' }} numberOfLines={1}>
                    {data.rank}. {data.name}
                  </Text>
                </View>
                <Text style={{ ...styles.expText, color: 'white' }}>{data.exp}</Text>
              </View>
            );
          } else {
            return (
              <View
                style={{
                  ...styles.rank,
                  flex: topExp === 3 ? 0.22 : 0.18,
                }}
                key={data.userName}
              >
                {renderAvatar(data)}
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
      {topExp == length && renderMoreIcon()}
    </View>
  );
}

const notUserJoin = () => {
  return (
    <View style={styles.notUser}>
      <Text style={styles.status}>Hiện tại, chưa có người dùng nào tham gia khóa học</Text>
      <View style={styles.notUserIcon}>
        <Fontisto name="frowning" size={60} color="black" />
      </View>
    </View>
  );
};

const renderAvatar = (obj) => {
  return (
    <View style={styles.avatar}>
      <Image style={styles.avatarImg} source={{ uri: obj.url }} />
    </View>
  );
};

const styles = StyleSheet.create({
  rankingContainer: {
    display: 'flex',
    width: '85%',
    backgroundColor: 'white',

    borderRadius: 19,
    elevation: 5,
  },
  rankingHeader: {
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
    paddingVertical: 30,
    paddingHorizontal: 20,
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
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,

    flexDirection: 'row',
    alignItems: 'center',

    borderTopWidth: 1,
    borderColor: '#DDDDDD',
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
  moreIcon: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

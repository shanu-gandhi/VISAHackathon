import React, { useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, TouchableOpacity, Button, TextInput, StyleSheet, Text, View } from 'react-native';
import { AppStyles } from '../src/AppStyles'
import Navigator from '../navigation/Navigator';
import AsyncStorage from '@react-native-community/async-storage'
import Spinner from 'react-native-loading-spinner-overlay';

import VisaExpLogo from '../assets/visaLoading.png';


const FirstPage = props => {
  const [showspinner, setSpinner] = useState(false);
  const [email, setMail] = useState("");
  const [isHidden, setHidden] = useState(false);
  const [password, setPasswd] = useState("");
  const [isLoading, setLoading] = useState(false);
 const [ismailerr, setmailerr] = useState(false);
const [ispassempty, setpassempty] = useState(false);


  const [testv, settestv] = useState(false);
  const [tstd, setTstd] = useState("hello2");
  const chng = event => {
    setMail(event);
    setHidden(false);
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(event) == false) 
    {
      setmailerr(true);
    }else{
      setmailerr(false);
    }
  };
  const chng2 = event => {
    setPasswd(event);
    setHidden(false);
    if(event==""){
      setpassempty(true);
    }else
    {
      setpassempty(false);
    }
  }
  return (
    <View style={styles.container}>
      <Spinner
        visible={showspinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />

      <View style={styles.img2}>
        <Image style={styles.imgin} source={VisaExpLogo} />
      </View>
      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={chng}
        />
      </View>
      {ismailerr ? (
        <Text style={styles.invlogin} >Invalid Email. Please Enter a valid email ID</Text>
      ) : null
      }

      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#003f5c"
          onChangeText={chng2}

        />
      </View>
      {ispassempty ? (
        <Text style={styles.invlogin} >Please Enter your Password.</Text>
      ) : null
      }

      {isHidden ? (
        <Text style={styles.invlogin} >Invalid Login, Try Again!</Text>
      ) : null
      }

      {isLoading && (<View>
        <Text style={styles.or}>Logging You In, Please Wait!</Text>
      </View>
      )}

      <TouchableOpacity style={styles.loginBtn}
      disabled={ismailerr || ispassempty}
        onPress={
          () => {
            setLoading(true);
            setSpinner(true);
            console.log("user:", email)
            console.log("passwd:", password)

            fetch('https://visa-concierge-service.herokuapp.com/user/checkUserLogin', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "email": email,
                "password": password,
              }),

            }).then(response => response.json())
              .then((responseJson) => {
                console.log('getting data from fetch', responseJson)
                setLoading(false)
                if (responseJson && responseJson["result"] == true) {
                  setHidden(false);
                  AsyncStorage.multiSet([
                    ['cardEnding', responseJson["cardEnding"].toString()],
                    ['email', responseJson["email"]]
                  ]);
                  setSpinner(false);
                  props.navigation.replace('HomePage');
                }
                setSpinner(false);

              })
              .catch(error => console.log(error))
            setTimeout(
              () => { setHidden(true), setSpinner(false) },
              3000
            )
          }
        }
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <Text style={styles.or}>OR</Text>


      <TouchableOpacity style={styles.signUpBtn}
        onPress={
          () => {
            props.navigation.navigate('Register');
          }
        }
      >
        <Text style={styles.signUpText}>Register</Text>
      </TouchableOpacity>

    </View>
  );

};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#142165",
    justifyContent: 'center'
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  signUpBtn: {
    color: "white",
    fontSize: 15
  },
  signUpText: {
    color: "#faaa13",
    fontSize: 20
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fdbb0a",
    marginBottom: 40
  },
  or: {
    fontSize: 20,
    alignItems: "center",
    color: "white",
    marginTop: 5,
    marginBottom: 5
  },
  invlogin: {
    fontSize: 10,
    alignItems: "center",
    color: "red",
    marginTop: 1,
    marginBottom: 1
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: "bold",
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 0,
    color: "#fdbb0a"
  },
  leftTitle: {
    alignSelf: "stretch",
    textAlign: "left",
    marginLeft: 20
  },
  centreTitle: {
    alignSelf: "stretch",
    textAlign: "center",
    marginLeft: 20
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: "center",
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  loginText: {
    color: AppStyles.color.white
  },
  placeholder: {
    fontFamily: AppStyles.fontName.text,
    color: "red"
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "white",
    color: AppStyles.color.text

  },
  facebookContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.facebook,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  inputView: {
    width: "80%",
    backgroundColor: "#B1B8E6",
    borderRadius: 25,
    height: 55,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  facebookText: {
    color: AppStyles.color.white
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#faaa13",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imagel: {
    padding: 10
  },
  img2: {
    padding: 40
  },
  imgin: {
    height:118,
    width:250,
    overflow: "hidden",
  }
});


export default FirstPage;
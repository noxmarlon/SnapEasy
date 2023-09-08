import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import AppIcon from "./AppIcons";
import MultiSelect from "react-native-multiple-select";
import { fetchEmails, sendSnap } from "../../service/snaps";
import { vw, vh } from "react-native-expo-viewport-units";


const Home = () => {
  const cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  //type camera
  const [typeCamera, setTypeCamera] = useState("back");
  const [flashMode, setFlashMode] = useState("off");
  //const for send snap
  const [imagePreview, setImagePreview] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [SendSnap, setSendSnap] = useState(null);

  //const for multi select
  const [emails, setEmails] = useState([]);
  const [email, setEmail] = useState([]);
  const [duration, setDuration] = useState([]);
  const durations = [...Array(10).keys()].map((i) => i + 1);
  

  useEffect(() => {
    fetchEmails(setEmails).then((rep) => {
      setEmail(rep[0].email);
    });
  }, []);

  const changeFlashMode = () => {
    if (flashMode === "off") {
      setFlashMode("on");
    } else {
      setFlashMode("off");
    }
  };

  const changeCameraType = () => {
    if (typeCamera == "front") {
      setTypeCamera("back");
    } else if (typeCamera == "back") {
      setTypeCamera("front");
    } else {
      setTypeCamera("front");
    }
  };


  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  const takePicture = async () => {
    if (!cameraRef) {
      return;
    }
    try {
      const pic = await cameraRef.current.takePictureAsync();
      setImagePreview(pic.uri);
      setIsOpen(true);
      setPhoto(pic);
    } catch (error) {
      console.log("error taking picture");
    }
  };
  let savePhoto = () => {
    MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
      setPhoto(undefined);
    });
  };
  async function SelectContacts() {
    setSendSnap(true);
    setIsOpen2(true);

  }
  async function closeSendSnap() {
    setSendSnap(null);
    setIsOpen2(false);
    
    
    
  }
  ////SNAP SECTION 


  async function sendNewSnap () {
    console.log(imagePreview, duration, email[0]);
    await sendSnap({ photo: imagePreview, duration: duration[0], email: email[0] });
    setImagePreview(null);
    setSendSnap(null);
    setIsOpen2(false);
  }

  ////////////////////
 
  if (SendSnap) {
    return (
      
      <Modal  animationType="fade" visible={isOpen2} >
         
      <View
        style={{
          flex: 1,
          backgroundColor: "#222",
          height: "100%",
          width: "100%",
        }}
      >
       

        <View>
          {/* <Header padding={false} /> */}
          <Text style={styles.title}>CHOOSE YOUR CONTACT</Text>
          <View style={styles.emailSelect}>
            <Text style={styles.titleSelects}> Select Email</Text>
            <MultiSelect
              items={emails.map((i) => {
                return {
                  id: i.email,
                  name: i.email,
                };
              })}
              single="true"
              uniqueKey="id"
              onSelectedItemsChange={(value) => setEmail(value)}
              selectedItems={email}
              selectText="Pick Emails"
              searchInputPlaceholderText="Search Email..."
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              searchInputStyle={{ color: "#CCC" }}
              submitButtonColor="#CCC"
              submitButtonText="Submit"
            />
          </View>

          <View style={styles.emailSelect}>
            <MultiSelect
              items={durations.map((i) => {
                return {
                  id: i.toString(),
                  name: i.toString(),
                };
              })}
              single="true"
              uniqueKey="id"
              onSelectedItemsChange={(value) => setDuration(value)}
              selectedItems={duration}
              selectText="Pick Duration"
              searchInputPlaceholderText="Search Duration..."
              emailsInput
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              searchInputStyle={{ color: "#CCC" }}
              submitButtonColor="#CCC"
              submitButtonText="Submit"
            />
          </View>
          <View style={styles.closeBtn}>
          <AppIcon
            AntName="closecircle"
            size={30}
            color="#eee"
            onPress={closeSendSnap}
          />
        </View>
        </View>
        <TouchableOpacity onPress={sendNewSnap} style={styles.button}>
        <Text style={styles.text}>Send</Text>
      </TouchableOpacity>
        
      </View>
      </Modal>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    // let savePhoto = () => {
    //   MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
    //     setPhoto(undefined);
    //   });
    // };

    // return (
    //   <SafeAreaView style={styles.container}>
    //     <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
    //     <Button title="Share" onPress={sharePic} />
    //     {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
    //     <Button title="Discard" onPress={() => setPhoto(undefined)} />
    //   </SafeAreaView>
    // );
  }
  const closeImagePreview = () => {
    setImagePreview(null);
    setIsOpen(false);
    
  };

  if (imagePreview) {
    return (
      <Modal animationType="fade" visible={isOpen}>
        <Image
          source={{ uri: imagePreview }}
          style={{ height: "100%", width: "100%" }}
        />
        <View style={styles.actionBottom}>
          {/* <AppIcon IonName="send-outline" size={25} color="#eee"/>s */}
          <AppIcon
            IonName="save-outline"
            size={25}
            color="#eee"
            onPress={savePhoto}
          />
          <AppIcon
            IonName="send-outline"
            size={25}
            color="#eee"
            style={styles.sendBtn}
            onPress={SelectContacts}
          />
        </View>
        <View style={styles.closeBtn}>
          <AppIcon
            AntName="closecircle"
            size={30}
            color="#eee"
            onPress={closeImagePreview}
          />
        </View>
      </Modal>
    );
  }

  return (
    <Camera
      style={styles.container}
      type={typeCamera}
      flashMode={flashMode}
      ref={cameraRef}
    >
      <TouchableOpacity
        style={styles.captureBtn}
        onPress={takePicture}
      ></TouchableOpacity>
      <View style={styles.header}>
        <AppIcon AntName="user" color="#eee" size={24} />
        <AppIcon IonName="settings-outline" color="#eee" size={24} />
      </View>

      <View style={styles.sideItem}>
        <AppIcon
          style={styles.sideIcons}
          IonName="camera-outline"
          color="#eee"
          size={20}
          onPress={changeCameraType}
        />
      </View>
      <View style={styles.sideItem2}>
        <AppIcon
          IonName="flash-outline"
          color="#eee"
          size={20}
          onPress={changeFlashMode}
        />
      </View>
    </Camera>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
  btn: {
    padding: 20,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  btnText: {
    color: "#eee",
    fontSize: 18,
    fontWeight: "bold",
  },
  captureBtn: {
    position: "absolute",
    bottom: 20,
    width: 80,
    height: 80,
    borderRadius: 100,
    borderColor: "#eee",
    borderWidth: 6,
    alignSelf: "center",
  },
  header: {
    position: "absolute",
    top: 40,
    justifyContent: "space-between",
    padding: 10,
    flexDirection: "row",
    width: "100%",
  },
  sideItem: {
    position: "absolute",
    top: 120,
    right: 0,
    padding: 10,
  },
  sideItem2: {
    position: "absolute",
    top: 190,
    right: 0,
    padding: 10,
  },
  sideIcons: {
    width: 50,
    height: 50,
    marginVertical: 10,
  },
  actionBottom: {
    position: "absolute",
    bottom: 20,
    padding: 10,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sendBtn: {
    backgroundColor: "yellow",
  },
  closeBtn: {
    position: "absolute",
    padding: 10,
    top: 40,
  },
  title: {
    textAlign: "center",
    fontSize: vw(8),
    padding: vw(5),
    fontWeight: "bold",
    marginTop: vw(40),
    marginBottom: vh(5),
    textDecorationLine: "underline",
    color: "#EEE",
  },
  emailSelect: {
    width: vw(80),
    marginLeft: vw(10),
    marginBottom: vh(3),
  },
  button: { 
    backgroundColor: "#0eadff", 
    marginBottom: 16, 
    marginLeft: 100,
    width: "50%", 
    text: "center", 
    borderRadius: "50%", 
    height: "5%", 
    justifyContent: "center", 
    alignItems: "center", 
  },
  titleSelects: {
    fontSize: vw(8),
    color: "#EEE",
    marginLeft: vw(20),
    marginBottom: vh(2),
    fontFamily: "Roboto",
  }
});

export default Home;

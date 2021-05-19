import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
export const initializeLoginFramework = () => {
        if(firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        return signedInUser;
        // console.log(displayName, email, photoURL);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
  };

export  const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
      .then((res) => {
        var user = res.user;
        return user;
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
  };

export  const handleSignOut = () => {
    return firebase.auth().signOut()
      .then((res) => {
        const signOutUser = {
          isSignedIn: false,
          name: "",
          photo: "",
          email: "",
          error: "",
          success: false
        };
        return signOutUser;
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err.message);
      });
  }
//   export const createUserWithEmailAndPassword = () => {
//     return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//       .then((res) => {
//         // console.log(res);
//         const newUserInfo = { ...user };
//         newUserInfo.error = "";
//         newUserInfo.success = true;
//         setUser(newUserInfo);
//         console.log(newUserInfo);
//         updateUserName(user.name);
//       })
//       .catch((error) => {
//         const newUserInfo = { ...user };
//         newUserInfo.error = error.message;
//         newUserInfo.success = false;
//         setUser(newUserInfo);
//       });
//   }

// export const signInWithEmailAndPassword = () =>{
//     firebase
//         .auth()
//         .signInWithEmailAndPassword(user.email, user.password)
//         .then((res) => {
//           const newUserInfo = { ...user };
//           newUserInfo.error = "";
//           newUserInfo.success = true;
//           setUser(newUserInfo);
//           setLoggedInUser(newUserInfo);
//           history.replace(from);
//         })
//         .catch((error) => {
//           const newUserInfo = { ...user };
//           newUserInfo.error = error.message;
//           newUserInfo.success = false;
//           setUser(newUserInfo);
//         });
// }

// const updateUserName = (name) => {
//     var user = firebase.auth().currentUser;
//     user
//       .updateProfile({
//         displayName: name,
//       })
//       .then(function () {
//         console.log("user name Updated");
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };
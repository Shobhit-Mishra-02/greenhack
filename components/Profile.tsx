import { Dispatch, SetStateAction } from "react";
import { BsCardImage } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import useAuth from "../components/hooks/authHook";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "../firebase/lib";
import { updateProfile, User } from "firebase/auth";

interface ProfileInterface {
  name: string;
  email: string;
  imageUrl: string;
  imageName: string;
  files: FileList;
}

const Profile: React.FC<{
  setProfileStatus: Dispatch<SetStateAction<boolean>>;
}> = ({ setProfileStatus }) => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    imageUrl: "",
    imageName: "",
    files: {} as FileList,
  } as ProfileInterface);

  const { isUser, userInfo } = useAuth();

  const getUser = () => {
    if (isUser) {
      setProfile({
        ...profile,
        name: userInfo.displayName ? userInfo.displayName : "",
        email: userInfo.email as string,
        imageUrl: userInfo.photoURL ? userInfo.photoURL : "",
      });
    }
  };

  const createImageUrl = (files: FileList | null) => {
    if (files != null && files.length) {
      let url = URL.createObjectURL(files?.[0] as any);
      setProfile({
        ...profile,
        imageUrl: url,
        imageName: files[0].name,
        files: files,
      });

      // console.log(profile);
    }
  };

  const onSubmit = () => {
    console.log("running function");
    if (isUser) {
      if (profile.imageUrl.length && profile.files.length) {
        console.log("start upload");
        const storageRef = ref(storage, `profile/${profile.imageName}`);
        const uploadTask = uploadBytesResumable(storageRef, profile.files[0]);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.log(error.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              updateProfile(auth.currentUser as User, {
                photoURL: downloadURL,
              }).then(() => {
                console.log(downloadURL);
              });
            });
          }
        );
      }

      if (profile.name != userInfo.displayName) {
        console.log("updating user name");
        updateProfile(auth.currentUser as User, {
          displayName: profile.name,
        });
      }
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUser]);

  return (
    <div className="fixed top-0 bottom-0 w-full z-10">
      <div className="w-full h-full bg-gray-500 opacity-30 absolute -z-10"></div>
      <div className="flex justify-center align-middle items-center h-screen">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="w-fit bg-white rounded-md shadow-lg border"
        >
          <div className="flex justify-end pt-4 pb-6 px-4">
            <FiX
              className="w-6 h-6 text-gray-500 cursor-pointer"
              onClick={() => setProfileStatus(false)}
            />
          </div>
          <h2 className="text-3xl md:text-4xl text-center">Profile</h2>

          <div className="space-y-3 px-2 pb-4 pt-8 h-[450px] overflow-auto">
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={profile.name}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    name: e.target.value,
                  })
                }
                className="w-[300px] md:w-[400px] px-2 py-1 rounded-md border border-gray-400"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={profile.email}
                className="w-[300px] md:w-[400px] px-2 py-1 rounded-md border border-gray-400"
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="image">Add profile pic</label>
              {profile.imageUrl.length ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="w-[200px] h-[200px] pb-2 mx-auto rounded-full"
                  src={profile.imageUrl}
                  alt="img"
                />
              ) : (
                <div className="flex justify-center align-middle items-center w-[200px] h-[200px] mb-2 bg-gray-300 text-2xl text-gray-400 rounded-full mx-auto">
                  <h2>Image</h2>
                </div>
              )}

              <div className="relative w-[300px] md:w-[400px] h-[60px] rounded-md border-dashed border-2 border-gray-500">
                <div className="absolute top-0 bottom-0 w-full flex justify-center align-middle items-center">
                  <BsCardImage className="w-6 h-6 text-gray-400" />
                </div>
                <input
                  className="opacity-0 h-full w-full cursor-pointer"
                  type="file"
                  name="image"
                  onChange={(e) => createImageUrl(e.target.files)}
                  id="image"
                />
              </div>
            </div>
            {/* <div className="flex flex-col">
              <label htmlFor="address">Address</label>
              <textarea
                name="address"
                id="address"
                cols={30}
                rows={5}
                className="w-[300px] md:w-[400px] px-2 py-1 rounded-md border border-gray-400"
              ></textarea>
            </div> */}
            <div className="pt-6">
              <button
                type="submit"
                className="px-4 py-1 text-xl text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Update profile
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

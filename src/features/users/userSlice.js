import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

//fetching the users location with the Async Thunk method.

export const fetchAddress = createAsyncThunk("users/fetchAddress", async () => {
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  return { position, address };
});

const initialState = {
  userName: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
  //this extraReducer for the thunk wasn't difficult to understand.
  //Easier than it looks.
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        (state.status = "idle"),
          (state.position = action.payload.position),
          (state.address = action.payload.address);
      })
      .addCase(fetchAddress.rejected, (state) => {
        (state.status = "error"),
          (state.error = "There was a problem getting your address ");
      });
  },
});

export const { updateUserName } = userSlice.actions;

export default userSlice.reducer;

//function for the useSelector, not necesssary just currious.
export const getUser = (state) => state.user.userName;

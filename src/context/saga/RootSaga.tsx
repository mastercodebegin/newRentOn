import React from "react"
import { all } from "@redux-saga/core/effects"
import LoginSaga from "./LoginSaga"
import ProfileSaga from "./ProfileSaga"
import DashboardSaga from "../../screen/dashboard/DashboardSaga"


 export default function* RootSaga(){
    yield all([
        LoginSaga(),
        ProfileSaga(),
        DashboardSaga()

      ])
}
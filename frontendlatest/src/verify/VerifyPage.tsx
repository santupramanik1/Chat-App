import {Suspense} from "react";
import {VerifyOtp} from "../components/VerifyOtp";
import { Loading } from "../components/Loading";

export const VerifyPage = () => {
    return (
        <Suspense fallback={<Loading></Loading>}>
            <VerifyOtp></VerifyOtp>
        </Suspense>
    );
};

import React from "react";
import UserProduct from "../components/Products/UserProduct";
import AdminProducts from "../components/Products/AdminProducts";

export default function Products({ user }) {

    if (!user) {
        console.log("No user → showing UserProduct");
        return <UserProduct />;
    }

    if (user?.role?.toLowerCase() === "admin") {
        console.log("Admin detected → showing AdminProducts");
        return <AdminProducts />;
    }

    console.log("Regular user → showing UserProduct");
    return <UserProduct />;
}
'use client'

import { getMembership } from "@/actions/get.menbership"
import { useEffect, useState } from "react";

const useMembership = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        GetMembership();
    } , [])
    
    const GetMembership = async () => {
        await getMembership()
        .then((data) => {
            setData(data);
            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setLoading(false);
        })
    }
    
    return {
        data, loading
    }
}

export default useMembership;
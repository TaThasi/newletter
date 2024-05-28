


import { subscribersAnalytics } from "@/actions/subscriber.analytics";
import { useEffect, useState } from "react"
export default function useSubscribersAnalytics() {
    const [SubscribersData, setSubscribersData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        SubscribersAnalytics();
      }, [])
  
    const SubscribersAnalytics = async () => {
        await subscribersAnalytics()
        .then((res) =>{
          setSubscribersData(res);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err)
        })
      }
    
      
      return { SubscribersData, loading };
}
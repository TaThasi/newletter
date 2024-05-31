
import { manageSubscription } from "@/actions/manage.subscription";
import useMembership from "@/shared/hooks/useMembership";
import useSubscribersData from "@/shared/hooks/useSubscribersData";
import ICONS from "@/shared/utils/icons";
import { Slider } from "@nextui-org/slider";
import { useRouter } from "next/navigation";

export default function UserPlan() {  
    const {data, loading} = useSubscribersData();
    const {data: membershipData, loading: membershipLoading} = useMembership();
    const router = useRouter();
    const handleManage = async () => {
      await manageSubscription({
        customerId: membershipData.stripeCustomerId,
      })
      .then((res) => {
        router.push(res);
      }).catch((err) => {
        console.log(err);
      })
    }

    return (
        <div className="w-full my-3 p-3 bg-[#FDF1F8] rounded hover:shadow-xl cursor-pointer"
        >
      <div className="w-full flex items-center">
        <h5 className="text-lg font-medium">
            {loading ? "..." : membershipData.plan} Plan
        </h5>
        <div
          className="w-[95px] shadow ml-2 cursor-pointer h-[32px] flex justify-center items-center space-x-1 rounded-lg bg-[#E77CAE]"
        >
          <span className="text-white text-xl">{ICONS.electric}</span>
          <span className="text-white text-sm" 
            onClick={handleManage}
          >Upgrade</span>
        </div>
      </div>
      <h5 className="text-[#831743]">Total subscribers</h5>
      <Slider
        aria-label="Player progress"
        hideThumb={true}
        defaultValue={1}
        className="max-w-md"
      />
      <h6 className="text-[#831743]">
        {loading ? "..." : data?.length}  of {
          membershipData.plan === "GROW" ? "2500" : membershipData.plan === 'Scale' ? "10,000" : "1,000,000"
        }{" "} added
      </h6>
    </div>
    )
}
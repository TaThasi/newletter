

import Header from "@/shared/widgets/header/header"
import Banner from "./features/banner"
import Branding from "./features/branding"
import Benefits from "./features/benefits"
import FeatureHighLight from "./features/features.highlight"
import Pricing from "./features/pricing"
import Footer from "@/shared/widgets/footer/footer"
export default function Home() {
    
    return (
        <div>
            <Header />
            <Banner />
            <Branding />
            <Benefits />
            <FeatureHighLight />
            <Pricing />
            <Footer />
        </div>
    )
}
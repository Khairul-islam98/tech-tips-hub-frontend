
import Navbar from "@/components/shared/navbar/navbar"
import { ReactNode } from "react"
const RootLayout = ({children}:{children: ReactNode}) => {
    return (
        <>
        <Navbar />
        {children}
        </>
    )
}

export default RootLayout
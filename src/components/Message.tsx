import { ReactNode } from "react"

function Message({children}:{children: ReactNode}){
    return(
        <div>{children}</div>
    )
}

export default Message
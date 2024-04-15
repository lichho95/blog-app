import React, { PropsWithChildren } from "react"
import { BrowserRouter } from "react-router-dom"

export const TestRoot: React.FC<PropsWithChildren>= ({children}) => {
    return <BrowserRouter>{children}</BrowserRouter>
}
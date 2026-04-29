import { NextRequest, NextResponse } from 'next/server'

const proxy = (req: NextRequest) => {
    const { pathname } = req.nextUrl
    const token = req.cookies.get("USER")?.value

    if (pathname.startsWith("/admin") && !token) {
        return NextResponse.redirect(new URL("/signin", req.url))
    }

    if (pathname.startsWith("/employee") && !token) {
        return NextResponse.redirect(new URL("/signin", req.url))
    }

    return NextResponse.next()
}

export default proxy
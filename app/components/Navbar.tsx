import { Link, useMutation, useRouter } from "blitz"
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { ReactElement, Suspense } from "react"
import { HiHome } from "react-icons/hi"
import { ImBooks } from "react-icons/im"
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa"
import { IoMdPerson } from "react-icons/io"

type NavlinkProps = {
  path: string
  text: string
  icon?: ReactElement
}

const Navlink = ({ path, text, icon = <></> }: NavlinkProps) => (
  <Link href={path}>
    <a className="flex flex-row items-center p-1 mr-4 transition duration-200 ease-in-out rounded-sm hover:bg-gray-600">
      {icon}
      {text}
    </a>
  </Link>
)

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const router = useRouter()

  return (
    <>
      <div className="flex flex-row items-center">
        <Navlink path="/" text="Home" icon={<HiHome className="mr-1" />} />
        <Navlink path="/courses" text="Courses" icon={<ImBooks className="mr-1" />} />
      </div>
      <div className="flex flex-row">
        {currentUser ? (
          <button
            className="flex flex-row items-center p-1 mr-4 transition duration-200 ease-in-out rounded-sm hover:bg-gray-600"
            onClick={async () => {
              await logoutMutation()
              router.push("/")
            }}
          >
            <FaSignOutAlt className="mr-1" />
            Logout
          </button>
        ) : (
          <>
            <Navlink path="/signup" text="Sign Up" icon={<IoMdPerson className="mr-1" />} />
            <Navlink path="/login" text="Login" icon={<FaSignInAlt className="mr-1" />} />
          </>
        )}
      </div>
    </>
  )
}

const Navbar = () => (
  <nav className="flex flex-row justify-between pt-2 pb-2 mb-4 text-white bg-gray-900 px-96">
    <Suspense fallback="Loading">
      <UserInfo />
    </Suspense>
  </nav>
)

export default Navbar

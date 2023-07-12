import { useContext } from "react"
import { AuthContext } from "../../context/AuthReducer"

import { ProfileSection, ProfileContainer } from "../../styles/Profile"
import ManufacturerProfile from "../../components/ManufacturerProfile"
import TransporterProfile from "../../components/TransporterProfile"

const Profile = () => {
  const { user } = useContext(AuthContext)
  const { details } = user
  return (
    <>
      <ProfileSection>
        <ProfileContainer className="container">
          {details.user_type === "Manufacturer" ? (
            <ManufacturerProfile />
          ) : (
            <TransporterProfile />
          )}
        </ProfileContainer>
      </ProfileSection>
    </>
  )
}

export default Profile

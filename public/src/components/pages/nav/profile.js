import profile from '../../../images/jormunProfile.png'

const Profile = () => {
  return (
    <div className="profile flex flex-row items-center ml-2 mb-2 p-2 bg-gray-900 rounded-lg">
      <img src={profile} alt="Jormungander" className="w=10 h-10 mr-2" />
      <div className="self flex flex-col">
        <p className="text-blue-300 font-semibold text-sm">James McNeilan</p>
        <p className="text-blue-300 text-sm">Web Developer</p>
      </div>
    </div>
  )
}

export default Profile;

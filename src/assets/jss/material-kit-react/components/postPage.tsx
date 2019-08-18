import { container } from "assets/jss/material-kit-react.jsx"

const postPage = (theme: any) =>  ({
  container,
  profile: {
    textAlign: "center",
    "& img": {
      maxWidth: "160px",
      width: "100%",
      margin: "0 auto",
      transform: "translate3d(0, -50%, 0)"
    }
  },
  credit: {
    display: "flex",
    justifyContent: "space-around"
  },
  socialRight: {
    display: "flex"
  },
  socialInside: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  social: {
    padding: '30px 15px 3px 15px'
  },
  avatar: {
    paddingTop: '10px',
    paddingRight: '17px',
    [theme.breakpoints.down('xs')]: {
       paddingLeft: '31px'
   },
  },
 ownerDisplayName: {
    color: '#999',
    width: '100%',
    textAlign: 'center',
    padding: '10px 10px 15px 10px'
  },
  avatarBio: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
         display: 'block'
      }
  },
  menuItem: {
    paddingLeft: '2px',
    paddingRight: '2px',
  },
  bio: {
    paddingLeft: '10px',
    paddingRight: '10px',
    marginTop: '40px',
    paddingTop: '27px'

  },
  tagline: {
    fontSize: '0.8rem'
  },
  name: {
     marginBottom: '44px',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  comment: {
     display: 'flex',
     justifyContent: 'center'
  },
  circle: {
    paddingTop: '37px',
    paddingLeft: '19px'
  },
  voteCounter: {
    color: 'rgb(134, 129, 129)',
    fontSize: 10,
    fontWeight: 400,
    padding: 2,
    zIndex: 1
  },
  description: {
    margin: "1.071rem auto 0",
    maxWidth: "600px",
    color: "#999",
    textAlign: "center !important"
  },
  author: {
    marginTop: "-71px",
    marginBottom: "-21px"
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  title: {
    width: '100%',
    textAlign: 'center',
    paddingLeft: '10px',
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
  },
  socials: {
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px",
    color: "#999"
  },
})

export default postPage
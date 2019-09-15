
const PostPreview = (theme) => ({
    iconButton: {
      marginLeft: 5
    },
    RightAction: {
      display: 'flex',
      flex: 1
    },
    Card: {
       marginBottom: '10px',
       boxShadow: '0 2px 0px 0 #fafafa, 0 3px 1px -2px #fafafa, 0 1px 5px 0 #fafafa',
       [theme.breakpoints.down('xs')]: {
          paddingLeft: '6px',
          paddingRight: '16px'
       }
    },
    cardAction: {
      padding: '8px 13px'
    },
    cardContent: {
      padding: '27px',
      boxShadow: ''
    },
    cardBottemContent: {
      display: 'flex',
    },
    image: {
      height: '93px'
    },
    textArea: {
        width: '100%',
        height: '93px',
        overflow: 'hidden',
        paddingLeft: '17px'
    },
    mainBody: {
      marginTop: '-22px'
    },
    avatar: {
      paddingLeft: '15px'
    },
    title: {
        textAlign: 'center',
        width: '100%',
        display: "inline-block",
        position: "relative",
        marginTop: "16px",
        minHeight: "32px",
        fontWeight: "bold",
        textDecoration: "none"
      },
    header: {
      paddingBottom: '0px',
      marginBottom: '-60px',
    },
    voteCounter: {
      color: 'rgb(134, 129, 129)',
      fontSize: 10,
      fontWeight: 400,
      padding: 2,
      zIndex: 1
    },
    commentCounter: {
      color: 'rgb(134, 129, 129)',
      fontSize: 10,
      fontWeight: 400,
      padding: 4
    },
    popperOpen: {
      zIndex: 10
    },
    popperClose: {
      pointerEvents: 'none',
      zIndex: 0
    },
    postBody: {
      wordWrap: 'break-word',
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: '0.875rem',
  
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 300,
      lineHeight: "1.5em"
    },
    
    fullPageXs: {
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        height: '100%',
        margin: 0,
        overflowY: 'auto'
      }
    }
  })

  export default PostPreview;
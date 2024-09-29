// @mui material components
import Grid from "@mui/material/Grid";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";

// Overview page components
import Header from "layouts/profile/components/Header";

// Data
import profilesListData from "layouts/profile/data/profilesListData";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import MKBox from "components/MKBox";
import routes from "routes";
import samsungImage from "assets/images/268868_u7nsk3.png"; // Cambia esto por la ruta correcta de tu imagen.

function Overview() {
  return (
    <>
      <MKBox position="fixed" top="0.5rem" width="100%" zIndex={10}>
        <DefaultNavbar
          routes={routes}
          action={{
            type: "external",
            route: "https://www.creative-tim.com/product/material-kit-react",
            label: "INICIAR SESIÓN",
            color: "info",
          }}
          transparent
          light  
        />
      </MKBox>

      <Header />
      <SoftBox mt={6} mb={3}>
        <Grid container spacing={3}>
          {/* Columna para la imagen */}
          <Grid item xs={12} md={4} xl={3}>
            <SoftBox
              sx={{
                position: "relative",
                mt: -8,
                ml: 3,
                mr: 3,
                p: 2,
                borderRadius: "lg",
                backgroundColor: "white", // Fondo blanco
                boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
              }}
            >
              <img src={samsungImage} alt="Samsung Galaxy S23" style={{ width: "100%", borderRadius: "10px" }} />
            </SoftBox>
          </Grid>

          {/* Columna para ProfileInfoCard */}
          <Grid item xs={12} md={6} xl={4}>
            <ProfileInfoCard
              title="profile information"
              description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
              info={{
                fullName: "Alec M. Thompson",
                mobile: "(44) 123 1234 123",
                email: "alecthompson@mail.com",
                location: "USA",
              }}
              social={[
                {
                  link: "https://www.facebook.com/CreativeTim/",
                  icon: <FacebookIcon />,
                  color: "facebook",
                },
                {
                  link: "https://twitter.com/creativetim",
                  icon: <TwitterIcon />,
                  color: "twitter",
                },
                {
                  link: "https://www.instagram.com/creativetimofficial/",
                  icon: <InstagramIcon />,
                  color: "instagram",
                },
              ]}
              action={{ route: "", tooltip: "Edit Profile" }}
            />
          </Grid>

          {/* Columna para ProfilesList */}
          <Grid item xs={12} xl={4}>
            <ProfilesList title="conversations" profiles={profilesListData} />
          </Grid>
        </Grid>
      </SoftBox>
    </>
  );
}

export default Overview;

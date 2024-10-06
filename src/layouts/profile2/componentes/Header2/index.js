import { useState, useEffect } from "react";
import PropTypes from 'prop-types'; // Import PropTypes

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import curved0 from "assets/images/curved-images/curved0.jpg";

function Header2({ title }) { // Receiving title as prop
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    // The event listener that's calling the handleTabsOrientation function when resizing the window.
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  return (
    <SoftBox position="relative">
      <SoftBox
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        minHeight="25.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${curved0})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
          "::before": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "50px",
            backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))`, // Degradado hacia el blanco
          },
        }}
      >
        <SoftTypography
          variant="h2"
          color="white"
          fontWeight="bold"
          sx={{ fontFamily: "Roboto, sans-serif" }}
        >
          {title} {/* Dynamic title */}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

// Define PropTypes for the Header component
Header2.propTypes = {
  title: PropTypes.string.isRequired, // 'title' should be passed as a string and is required
};

export default Header2;

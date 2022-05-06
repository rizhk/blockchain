import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { LazyLoadImage } from "react-lazy-load-image-component";

type Variant = "light" | "primary";

interface LogoProps {
	variant?: Variant;
	width?: string;
	height?: string;
}

export const Logo = styled((props: LogoProps) => {
	const { variant, ...other } = props;

	const color = variant === "light" ? "#FF5A04" : "#BC043D";

	return (
		<LazyLoadImage
			width={props?.width || "42"}
			height={props?.height || "42"}
			src={process.env.NEXT_PUBLIC_URL + "picante-logo.svg"} // use normal <img> attributes as props
		/>
	);
})``;

Logo.defaultProps = {
	variant: "primary",
};

Logo.propTypes = {
	variant: PropTypes.oneOf<Variant>(["light", "primary"]),
};

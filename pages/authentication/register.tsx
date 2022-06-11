import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
	Box,
	Button,
	Card,
	Container,
	Divider,
	FormHelperText,
	Grid,
	Link,
	TextField,
	Typography,
} from "@mui/material";
import { GuestGuard } from "../../components/authentication/guest-guard";
import { AuthBanner } from "../../components/authentication/auth-banner";
import { AmplifyRegister } from "../../components/authentication/amplify-register";
import { Auth0Register } from "../../components/authentication/auth0-register";
import { FirebaseRegister } from "../../components/authentication/firebase-register";
import { JWTRegister } from "../../components/authentication/jwt-register";
import { Logo } from "../../components/logo";
import { useAuth } from "../../hooks/use-auth";
import { gtm } from "../../lib/gtm";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMounted } from "../../hooks/use-mounted";

const Register: NextPage = () => {
	const isMounted = useMounted();
	const router = useRouter();
	const { register } = useAuth();
	const { disableGuard } = router.query;

	const formik = useFormik({
		initialValues: {
			email: "",
			name: "",
			password: "",
			confirmPassword: "",
			submit: null,
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email("Must be a valid email")
				.max(255)
				.required("Email is required"),
			name: Yup.string().max(255).required("Name is required"),
			password: Yup.string()
				.min(8)
				.max(255)
				.required("Password is required"),
			confirmPassword: Yup.string()
				.min(8)
				.max(255)
				.required("Confirm password is required")
				.oneOf([Yup.ref("password"), null], "Passwords must match"),
		}),
		onSubmit: async (values, helpers): Promise<void> => {
			try {
				await register(values.email, values.name, values.password);

				if (isMounted()) {
					const returnUrl =
						(router.query.returnUrl as string | undefined) ||
						"/dashboard";
					router.push(returnUrl).catch(console.error);
				}
			} catch (err) {
				console.error(err);

				if (isMounted()) {
					helpers.setStatus({ success: false });
					helpers.setErrors({ submit: err.message });
					helpers.setSubmitting(false);
				}
			}
		},
	});

	useEffect(() => {
		gtm.push({ event: "page_view" });
	}, []);

	return (
		<>
			<Head>
				<title>
					Register | {process.env.NEXT_PUBLIC_PAGE_TITLE_SUFFEX}
				</title>
			</Head>
			<Box sx={{ backgroundColor: "white" }}>
				<Container maxWidth="xl">
					<Grid
						component="main"
						container
						spacing={0}
						sx={{ minHeight: "100vh" }}>
						<Grid item xs={12} md={6}>
							<Box
								sx={{
									backgroundColor: "white",
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
									height: "100%",
								}}
								px={12}>
								<Box>
									<img width={184} src={"/static/logo.png"} />
									<Typography variant="h4" my={3}>
										Sign up and start accepting crypto
										payments today.
									</Typography>
									<form
										noValidate
										onSubmit={formik.handleSubmit}>
										<TextField
											error={Boolean(
												formik.touched.name &&
													formik.errors.name
											)}
											fullWidth
											helperText={
												formik.touched.name &&
												formik.errors.name
											}
											label="Full name"
											margin="normal"
											name="name"
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
											value={formik.values.name}
										/>
										<TextField
											error={Boolean(
												formik.touched.email &&
													formik.errors.email
											)}
											fullWidth
											helperText={
												formik.touched.email &&
												formik.errors.email
											}
											label="Email Address"
											margin="normal"
											name="email"
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
											type="email"
											value={formik.values.email}
										/>
										<TextField
											error={Boolean(
												formik.touched.password &&
													formik.errors.password
											)}
											fullWidth
											helperText={
												formik.touched.password &&
												formik.errors.password
											}
											label="Password"
											margin="normal"
											name="password"
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
											type="password"
											value={formik.values.password}
										/>
										<TextField
											error={Boolean(
												formik.touched
													.confirmPassword &&
													formik.errors
														.confirmPassword
											)}
											fullWidth
											helperText={
												formik.touched
													.confirmPassword &&
												formik.errors.confirmPassword
											}
											label="Confirm password"
											margin="normal"
											name="confirmPassword"
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
											type="password"
											value={
												formik.values.confirmPassword
											}
										/>
										{formik.errors.submit && (
											<Box sx={{ mt: 3 }}>
												<FormHelperText error>
													{formik.errors.submit}
												</FormHelperText>
											</Box>
										)}
										<Box sx={{ mt: 2 }}>
											<Button
												disabled={formik.isSubmitting}
												fullWidth
												size="large"
												type="submit"
												variant="contained">
												Register
											</Button>
										</Box>
									</form>
									<Divider sx={{ my: 3 }} />
									<div>
										<NextLink
											href={
												disableGuard
													? `/authentication/login?disableGuard=${disableGuard}`
													: "/authentication/login"
											}
											passHref>
											<Link
												color="secondary.main"
												variant="body1"
												sx={{
													textDecoration: "underline",
												}}>
												Already have an account? Log in
												here.
											</Link>
										</NextLink>
									</div>
								</Box>
							</Box>
						</Grid>
						<Grid item xs={12} md={6}>
							<Box
								px={10}
								sx={{
									textAlign: "center",
									justifyContent: "center",
									background:
										'url("/static/auth/auth-bg.png"), linear-gradient(90deg, #BC043D 0%, #FF5A04 100%)',
									backgroundSize: "cover, auto",
									backgroundRepeat: "no-repeat",
									display: "flex",
									flexDirection: "column",
									height: "100%",
								}}>
								<img
									style={{ marginLeft: 20, marginRight: 20, objectFit: 'contain', maxHeight: '50vh' }}
									src={"/static/auth/register-banner.png"}
								/>
								<Typography
									color="primary.contrastText"
									variant="h5"
									mt={7}>
									Easiest way to on-ramp and off-ramp crypto
									currency for you and your business while
									earning tokens.
								</Typography>
							</Box>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</>
	);
};

Register.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default Register;

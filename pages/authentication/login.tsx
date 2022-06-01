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
import { useAuth } from "../../hooks/use-auth";
import { gtm } from "../../lib/gtm";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMounted } from "hooks/use-mounted";

const Login: NextPage = () => {
	const isMounted = useMounted();
	const router = useRouter();
	const { login } = useAuth();
	const { disableGuard } = router.query;

	const formik = useFormik({
		initialValues: {
			email: "demo@picante.io",
			password: "password",
			submit: null,
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email("Must be a valid email")
				.max(255)
				.required("Email is required"),
			password: Yup.string().max(255).required("Password is required"),
		}),
		onSubmit: async (values, helpers): Promise<void> => {
			try {
				await login(values.email, values.password);

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
					Login | {process.env.NEXT_PUBLIC_PAGE_TITLE_SUFFEX}
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
										Login
									</Typography>
									<form
										noValidate
										onSubmit={formik.handleSubmit}>
										<TextField
											autoFocus
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
												Log In
											</Button>
										</Box>
										<Divider sx={{ my: 3 }} />
										<div>
											<NextLink
												href={
													disableGuard
														? `/authentication/register?disableGuard=${disableGuard}`
														: "/authentication/register"
												}
												passHref>
												<Link
													color="secondary.main"
													variant="body1"
													sx={{
														textDecoration:
															"underline",
													}}>
													Create account
												</Link>
											</NextLink>
											{/* <NextLink
                  href={
                    disableGuard
                      ? `/authentication/password-recovery?disableGuard=${disableGuard}`
                      : '/authentication/password-recovery'
                  }
                  passHref
                >
                  <Link
                    color="secondary.main"
                    variant="body1"
                    sx={{ textDecoration: 'underline' }}
                    ml={1}
                  >
                    Forgot Password
                  </Link>
                </NextLink> */}
										</div>
									</form>
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
									style={{ marginLeft: 20, marginRight: 20 }}
									src={"/static/auth/login-banner.png"}
								/>
								<Typography
									color="primary.contrastText"
									variant="h5"
									mt={7}>
									Track and manage all your fiat and crypto
									conversions, payments and recievables in one
									place.{" "}
								</Typography>
							</Box>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</>
	);
};

Login.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default Login;

import { 
    Box,
    Grid,
    Link,
    Card,
    Avatar,
    Divider,
    CardMedia,
    Typography,
    CardContent,
} from "@mui/material";
import React from "react";
import { useAsync } from "react-use";

export default function TrustedProfile({ children, accountKey, referralId }: any) {
    const queryParams = (() => {
        let query = '?';
        if (accountKey) query += `accountKey=${accountKey}`;
        if (referralId) query += `&referralId=${referralId}`;
        return query;
    })();

    const { value, loading } = useAsync(async () => {
        const response = await fetch(`http://localhost:3001/api/profile${queryParams}`);

        if (response.ok) {
            return await response.json()
        }

        throw new Error('There was an issue fetching pro data.');
    });

    const CustomProfile = () => {
        if (React.Children.toArray(children).length > 1) {
            throw new Error('You must pass only 1 custom element for a profile layout.')
        }

        return React.Children.map(children, child => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                    loading,
                    data: value,
                } as any);
            }
        });
    }

    return (
        <div>
            {(children) ?
                <CustomProfile />
                :
                <Box
                    sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    p: 3
                    }}
                >
                    <Grid
                    container
                    spacing={3}
                    >
                    {value?.pros.map((applicant: any) => (
                        <Grid
                        item
                        key={applicant.id}
                        md={4}
                        xs={12}
                        >
                        <Card>
                            <CardMedia
                            image={applicant.cover}
                            sx={{ height: 200 }}
                            />
                            <CardContent sx={{ pt: 0 }}>
                            <Box
                                sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                mb: 2,
                                mt: '-50px'
                                }}
                            >
                                <Avatar
                                alt="Applicant"
                                src={applicant.avatar}
                                sx={{
                                    border: '3px solid #FFFFFF',
                                    height: 100,
                                    width: 100
                                }}
                                />
                            </Box>
                            <Link
                                align="center"
                                color="textPrimary"
                                display="block"
                                underline="none"
                                variant="h6"
                            >
                                {applicant.name}
                            </Link>
                            <Typography
                                align="center"
                                variant="body2"
                                color="textSecondary"
                            >
                                {applicant.email}
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ m: -0.5 }}>
                                <Typography style={{ fontSize: '15px' }} variant="body1">
                                    {applicant.bio}
                                </Typography>
                            </Box>
                            </CardContent>
                        </Card>
                        </Grid>
                    ))}
                    </Grid>
                </Box>
            }
        </div>
    );
}
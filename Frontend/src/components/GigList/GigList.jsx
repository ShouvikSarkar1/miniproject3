import { Card, CardContent, CardMedia, Typography, CardActionArea, Grid, Box, CircularProgress } from '@mui/material';

export default function GigList() {
  const [gigs, setGigs] = React.useState([]);  // Store the fetched gigs data
  const [loading, setLoading] = React.useState(true);  // For loading state
  const [error, setError] = React.useState('');  // For handling errors

  // Fetch gigs from the backend
  React.useEffect(() => {
    const fetchGigs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/gigs');  // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch gigs');
        }
        const data = await response.json();
        console.log('Fetched Gigs:', data);  // Debugging the fetched data
        setGigs(data);  // Set the fetched gigs to state
        setLoading(false);
      } catch (err) {
        setError(err.message);  // Set error message in case of failure
        setLoading(false);
      }
    };

    fetchGigs();  // Fetch the gigs when the component mounts
  }, []);

  // Loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Error handling
  if (error) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h6" color="error">{`Error: ${error}`}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Gigs Available</Typography>
      <Grid container spacing={4}>
        {gigs.length > 0 ? (
          gigs.map((gig) => (
            <Grid item xs={12} sm={6} md={4} key={gig._id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  {gig.image && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={gig.image}  // Image URL from the backend (replace with your actual image URL)
                      alt={gig.gigTitle}
                    />
                  )}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {gig.gigTitle}  {/* Gig Title */}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(gig.gigDate).toLocaleDateString()}  {/* Gig Date */}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {gig.gigDescription}  {/* Gig Description */}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      Location: {gig.location}  {/* Gig Location */}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6">No gigs available</Typography>
        )}
      </Grid>
    </Box>
  );
}

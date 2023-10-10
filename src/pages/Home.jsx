import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Home= () =>{
    return(
        <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={4}>
          <Card
            style={{
              padding: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                Email Service
              </Typography>
              <Typography>
                This is a media card. You can use this section to describe the
                content.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Card
            style={{
              padding: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
              WhatsApp Service
              </Typography>
              <Typography>
                This is a media card. You can use this section to describe the
                content.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Card style={{ padding: 2, display: 'flex', flexDirection: 'column', height: 240, }}>
          <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
              SMS Service
              </Typography>
              <Typography>
                This is a media card. You can use this section to describe the
                content.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
}

export default Home;
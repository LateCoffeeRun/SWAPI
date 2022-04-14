import { Button, Avatar } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import '../Style/MovieCard.css';

const overflow = {
    "textOverflow": "ellipsis",
    "overflow": "hidden",
    "whiteSpace": "nowrap"
}

const MovieCard = (props) => {
    return (
        <div>
            <Card sx={{ minWidth: 275, marginTop: 0, marginRight: 1, marginBottom: 1, marginLeft: 1}}>
                <CardContent sx={{ display: "flex" }}>
                    <div>
                        <Typography sx={{overflow}} variant="h6" component="div">
                            {props.data.title}
                        </Typography>
                        <Typography fontSize={14} sx={{ mb: 1.5, mt: 2 }}color="text.secondary">
                            Release date: {props.data.release_date}
                        </Typography>
                    </div>
                    <div className="episodeId">
                        <Avatar>{props.data.episode_id}</Avatar>
                    </div>
                </CardContent>
                <CardActions>
                    <Button variant="outlined" size="small" onClick={() => props.onClick(props.data.characters)}>Show cast</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default MovieCard;
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Avatar, Badge, Grid, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { AppCarOrientations, MoveTurn } from 'Types/gameTypes';
import React from 'react';


interface MoveItemProperties {
	moveTurn: MoveTurn
}

const MoveItem = ({
	moveTurn,
}: MoveItemProperties) => {

	return (
		<Box mb={2}>
			<Paper>
				<Box p={2}>
					<Grid container display="flex" spacing={2} >
						<Grid
							item
							position="relative"
							justifyContent="center"
							alignItems="center"
							display="flex">
							<Badge overlap="rectangular" badgeContent="➡️" >
								<Avatar style={{ background: moveTurn.gameObject.color, }}>
									<span style={{
										position: 'relative',
										top: -4,
									}}>
										🚓
									</span>
								</Avatar>
							</Badge>
						</Grid>
						<Grid container item xs display="flex" flexDirection="column">
							<Grid item>
								<p noWrap variant="body1" fontWeight={600}>
									{moveTurn.gameObject.key}
								</p>
							</Grid>
							<Grid item display="flex" alignItems="center">
								<p noWrap variant="body1" display="flex" alignItems="center" pr={2} fontWeight={600}>
									{moveTurn.gameObject.orientation === AppCarOrientations.Horizontal && (
										<>
											{moveTurn.fromX > moveTurn.toX && (
												<>
													<ArrowBackIcon fontSize="small" /> {moveTurn.fromX - moveTurn.toX}
												</>
											)}
											{moveTurn.fromX < moveTurn.toX && (
												<>
													<ArrowForwardIcon fontSize="small" /> {moveTurn.toX - moveTurn.fromX}
												</>
											)}
										</>
									)}
									{moveTurn.gameObject.orientation === AppCarOrientations.Vertical && (
										<>
											{moveTurn.fromY > moveTurn.toY && (
												<>
													<ArrowDownwardIcon fontSize="small" /> {moveTurn.fromY - moveTurn.toY}
												</>
											)}
											{moveTurn.fromY < moveTurn.toY && (
												<>
													<ArrowUpwardIcon fontSize="small" /> {moveTurn.toY - moveTurn.fromY}
												</>
											)}
										</>
									)}
								</p>
								<p noWrap variant="caption">
									(X{moveTurn.fromX}:Y{moveTurn.fromY} to X{moveTurn.toX}:Y{moveTurn.toY})
								</p>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</Paper>
		</Box>
	)
}

export default MoveItem;
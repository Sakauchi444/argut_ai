import React from "react";
import classes from "./Loading.module.css";

const Loading = () => {
	return (
		<div className={classes.container}>
			<div className={classes.top}>
				<div className={classes.square}>
					<div className={classes.square}>
						<div className={classes.square}>
							<div className={classes.square}>
								<div className={classes.square}>
									<div className={classes.square} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={classes.bottom}>
				<div className={classes.square}>
					<div className={classes.square}>
						<div className={classes.square}>
							<div className={classes.square}>
								<div className={classes.square}>
									<div className={classes.square} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={classes.left}>
				<div className={classes.square}>
					<div className={classes.square}>
						<div className={classes.square}>
							<div className={classes.square}>
								<div className={classes.square}>
									<div className={classes.square} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={classes.right}>
				<div className={classes.square}>
					<div className={classes.square}>
						<div className={classes.square}>
							<div className={classes.square}>
								<div className={classes.square}>
									<div className={classes.square} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Loading;

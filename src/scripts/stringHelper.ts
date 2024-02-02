export const formatDuration = (durationInMinutes: number) => {

	const hours = Math.floor(durationInMinutes / 60);
	const minutes = durationInMinutes % 60;
	// Use string interpolation to format the duration as "HH:MM"
	return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

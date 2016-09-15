# VVavves

[Live site](http://jordanburk.github.io/vvavves)

### Overview

VVavves is a whimsical simulation of sailboats adrift in the endless sea. The
environment changes constantly over time: The wind picks up, the wind dies down;
rain and snow come and go; the days slowly pass in a beautiful, mystical haze.

### Implementation

VVavves is built in HTML5 canvas and vanilla JavaScript.

The waves themselves are stored as collections of points. The points' vertical
motion is based on a sin wave, allowing them to rise and fall smoothly. They
move horizontally based on a global tide variable, which periodically changes
its acceleration (again, allowing for smooth speed transitions).

The rendering is accomplished by drawing quadratic curves between the midpoints
of each successive pair of points. This ensures a continuous curve; drawing
curves between the points themselves results in a disjoint where each curve
meets the next, due to how the curves are calculated.

### Upcoming Features

Feel like playing god with our intrepid little sailboats? Soon, you'll have
total control over all the environmental variables; adjust the wind speed,
precipitation, wave amplitude, and lighting, all to you your heart's content.

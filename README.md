# VVavves

[Live site](http://jordanburk.github.io/vvavves)

### vvvvvavvves

vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvavvvvvvvvvvvvvvvvvves

### Implementation

VVavves is built in HTML5 canvas and vanilla Javascript.

The waves themselves are stored as collections of points. The points' vertical
motion is based on a sin wave, allowing them to rise and fall smoothly. They move
horizontally based on a global tide variable, which periodically changes its
acceleration (again, allowing for smooth speed transitions).

The rendering is accomplished by drawing quadratic curves between the midpoints
of each successive pair of points. This ensures a continuous curve; drawing
curves between the points themselves results in a disjoint where each curve meets
the next, due to how the curves are calculated.

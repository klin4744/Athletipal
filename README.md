# Athletipal

Athletipal is a TensorFlow project built directly on top of Google's PoseNet model demo which acquires real-time pose data. This project uses simple kinetic and potential energy calculations as well as relativity equations to estimate the total amount of calories a person is burning by movement in real-time.

To use this implementation of PoseNet, first clone/fork the repository then run the following commands:

In the posenet directory:
<br>
<code>
yarn
</code>
<br>
In the posenet/models directory:
<br>
<code>
yarn npm install npm run watch
</code>
<br>

# Calculations

## Energy Calculations

<h4>Kinetic Energy</h4>
Basic kinetic energy was calculated using the kinetic energy equation: Ek = 1/2 mv^2, velocity was calculated using the following methodology: 
<ol>
<li> PoseNet runs at about 15 frames a second, converting this to seconds, it takes 1/15 seconds for one new PoseNet position calculation. A constant time of 1/15 seconds was used for time. </li>
<li> Distance was calculated using consecutive poses. One pose contains x and y coordinates for sixteen different points on the body, each run a frame is stored as the previous frame. The distance equation for 2d lines is used to caluclate distance between all 16 positons per pose, and that distance is then divided by time to calculate velocity. 
 </li>
  <li> Mass is input by the user and is, by default, in meters </li>
</ol>
<h4> Potential Energy </h4>
Basic potential energy was calculated using the potential energy equation: Ep = mgh. 
<ol>
<li> To account for changes in height, the change in height was calculated by finding the absolute difference of the previous height and the current pose. </li>
 <li> Mass is input by the user and the acceleration of gravity is defaulted to 9.81m/s^2 </li>
 </ol>

## Accounting for dynamic distance from the camera
To account for the user being at varying distances from the camera. The distance between the left shoulder and the left elbow is calculated. This distance is approximately 20% of the user's height. This distance multipled by their height gives a good estimate of the distance between those points in meters. The distance in pixels is then used and compared to the percentage of the screen this length takes up. This is used to map the distance in meters of one pixel on the camera frame. This allows us to account for dynamic distances from the camera 

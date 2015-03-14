/* global moment */

export default function timeUtil(initTime) {
  return {
    hoursInWords: function (seconds) {
      // Compress this into a loop
      var hours,
          pluralizedHour,
          time = "";

      if(seconds > 3600) {
        hours = Math.floor(seconds / 3600);
        seconds = seconds % 3600;
        if(hours > 1) {
          pluralizedHour = "hours";
        } else {
          pluralizedHour = "hour";
        }
      }

      if(seconds < 30) {
        time = "a few seconds";
      } else if(seconds <= 90) {
        time = "about a minute";
      } else if(seconds < 1500) {
        time = `${Math.round(seconds / 60)} minutes`;
      } else if(seconds < 2100) {
        if(hours === 1) {
          return "1 and a half hours";
        } else if(hours > 1) {
          time = "a half hours";
        } else {
          time = "half an hour";
        }
      } else if(seconds < 3300) {
        time = `${Math.round(seconds / 60)} minutes`;
      }

      if(hours) {
        if(seconds < 300) {
          time = `about ${hours} ${pluralizedHour}`;
        } else if(seconds >= 3300) {
          time = `about ${hours+1} hours`;
        } else {
          time = `${hours} ${pluralizedHour} and ${time}`;
        }
      }

      return time;
    },
    atWords: ["dawn", "sunrise", "noon", "sunset", "dusk"],
    timeOfDayInWords: function(timeOfDay) {
      var tod = {};
      if(timeOfDay < 600) {
        // Early morning 2–6 AM
        tod.modifier = "early";
        tod.time = "morning";
      } else if(timeOfDay < 700) {
        // Dawn 6–7 AM
        tod.time = "dawn";
      } else if(timeOfDay < 1130) {
        // Morning 7–11:30 AM
        tod.time = "morning";
      } else if(timeOfDay < 1230) {
        // Noon 11:30–12:30 PM
        tod.time = "noon";
      } else if(timeOfDay < 1800) {
        // Afternoon 12:30–6 PM
        tod.time = "afternoon";
      } else if(timeOfDay < 1900) {
        // Sunset 6–7 PM
        tod.time = "sunset";
      } else if(timeOfDay < 2000) {
        // Dusk 7–8 PM
        tod.time = "dusk";
      } else if(timeOfDay < 2200) {
        // Evening 7–10 PM
        tod.time = "evening";
      } else {
        // Night 10–4 AM
        tod.time = "night";
      }
      return tod;
    },
    atOrOnATime: function() {
      var timeOfDay = this.timeOfDayInWords(parseInt(moment(initTime).format("Hmm"))),
          time = moment(initTime),
          ret = "";
      if(this.atWords.indexOf(timeOfDay.time) !== -1) {
        // Should be "EARLY _DAY_ MORNING" instead of "_DAY_ EARLY MORNING"
        return `at ${timeOfDay.time} on a ${time.format("dddd")}`;
      } else {
        if(timeOfDay.modifier) {
          ret += `${timeOfDay.modifier} `;
        }
        ret += `on a ${time.format("dddd")} ${timeOfDay.time}`;
        return ret;
      }
    }
  };
}

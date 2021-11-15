#!/usr/bin/env python

##################################################
# Display date and time
# NetTimes v1.0
# Author : Phusit Roongroj <phusit@nectec.or.th>
# NetTimes status monitoring [Basic monitoring]
##################################################

import datetime
import flask
import os
from flask_cors import CORS

app = flask.Flask(__name__)
app.config["DEBUG"] = True
cors = CORS(app)

@app.route('/status', methods=['GET'])
def home():
        now = datetime.datetime.now()
        cmd_status = os.popen('ntpq -p | tail -1 | cut -c 1-9')
        cmd_offset = os.popen('ntpq -p | tail -1 | cut -c 65-72')
        status = cmd_status.read().strip()
        offset = cmd_offset.read().strip()
        if status == 'oGPS_NMEA':
            jsonStr='{"en_date":"'+now.strftime('%d-%B-%Y')+'","time":"'+now.strftime('%H:%M:%S')
            jsonStr = jsonStr+'","status":"'+status+'","offset":"'+offset+'"}'
        else:
            jsonStr = '{"output":"Sorry, something went wrong."}'
        return jsonStr

# Run api for test #
#if __name__ == '__main__':
# app.run(host='0.0.0.0',port=5463)
# app.run(debug=True)

#--- End -----#

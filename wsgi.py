##################################################
# Run api with gunicorn 
# NetTimes v 1.0
# Monitoring time stutus [Basic monitoring]
# @Author : Phusit Roongroj <phusit@nectec.or.th
#################################################

from getNetTimesStatus import app

if __name__ == "__main__":
    app.run()

#Inspired from http://www.takaitra.com/posts/384
import defs,time
import boto
from boto.ec2.connection import EC2Connection
IMAGE = 'ami-6cb7016d'
INSTANCE_TYPE   = 't1.micro'
ZONE            = 'ap-northeast-1a'
KEY_NAME = 'GarageRank'
args = { 'aws_access_key_id' :
	defs.ACCESS_KEY, 'aws_secret_access_key' : defs.SECRET_KEY}
print 'Starting an EC2 instance of type {0} with image{1}'.format(INSTANCE_TYPE, IMAGE)
region =  boto.ec2.get_region('ap-northeast-1',**args)
conn = region.connect(**args)
try:
	security_group = conn.create_security_group('GarageRank','GarageRank security group')
	security_group.authorize('tcp',80,80,'0.0.0.0/0')
	security_group.authorize('tcp',22,22,'0.0.0.0/0')
except boto.exception.EC2ResponseError:
	security_group = conn.get_all_security_groups(['GarageRank'])

key_pair = conn.get_key_pair('GarageRank')

if key_pair:
	key_pair = conn.get_key_pair('GarageRank')
	security_group = conn.get_all_security_groups(['GarageRank'])
key_pair = conn.create_key_pair('GarageRank')
key_pair.save('.')

reservation = conn.run_instances(IMAGE, instance_type=INSTANCE_TYPE,
		key_name=key_pair.name, placement=ZONE, security_groups=[security_group])
instance = reservation.instances[0]
time.sleep(10) # Sleep so Amazon recognizes the new instance
while not instance.update() == 'running':
	time.sleep(60) # Let the instance start up
	time.sleep(10) # Still feeling sleepy
	print 'Started the instance: {0}'.format(instance.dns_name)

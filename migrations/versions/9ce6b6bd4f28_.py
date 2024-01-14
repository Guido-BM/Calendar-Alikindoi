"""empty message

Revision ID: 9ce6b6bd4f28
Revises: 4c6ab4a841b4
Create Date: 2024-01-14 17:40:10.715499

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9ce6b6bd4f28'
down_revision = '4c6ab4a841b4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('piggybank',
    sa.Column('Goal_ID', sa.Integer(), nullable=False),
    sa.Column('User_ID', sa.Integer(), nullable=False),
    sa.Column('Target_Amount', sa.Numeric(), nullable=False),
    sa.Column('Current_Amount', sa.Numeric(), nullable=False),
    sa.Column('Deadline', sa.Date(), nullable=False),
    sa.ForeignKeyConstraint(['User_ID'], ['user.id'], ),
    sa.PrimaryKeyConstraint('Goal_ID')
    )
    op.create_table('wallet',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('balance', sa.Numeric(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('event_tag',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tag_id', sa.Integer(), nullable=False),
    sa.Column('event_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['event_id'], ['event.id'], ),
    sa.ForeignKeyConstraint(['tag_id'], ['tag.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('google_calendar_event',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('User_ID', sa.Integer(), nullable=True),
    sa.Column('event_id', sa.Integer(), nullable=True),
    sa.Column('Title', sa.String(length=255), nullable=True),
    sa.Column('Description', sa.Text(), nullable=True),
    sa.Column('Start_DateTime', sa.DateTime(), nullable=True),
    sa.Column('End_DateTime', sa.DateTime(), nullable=True),
    sa.Column('Sync_Status', sa.Boolean(), nullable=True),
    sa.Column('Last_Sync_Time', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['User_ID'], ['user.id'], ),
    sa.ForeignKeyConstraint(['event_id'], ['event.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('google_calendar_event')
    op.drop_table('event_tag')
    op.drop_table('wallet')
    op.drop_table('piggybank')
    # ### end Alembic commands ###

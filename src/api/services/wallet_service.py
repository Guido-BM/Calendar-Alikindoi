from ..models.db import db
from ..models.wallet import Wallet

class WalletService:
    @staticmethod
    def get_all_wallets():
        return Wallet.query.all()

    @staticmethod
    def get_wallet_by_id(wallet_id):
        return Wallet.query.get(wallet_id)

    @staticmethod
    def create_wallet(wallet):
        new_wallet = Wallet(
            wallet_name=wallet['wallet_name'],
            wallet_type=wallet['wallet_type'],
            user_id=wallet['user_id']
        )
        db.session.add(new_wallet)
        db.session.commit()
        return new_wallet

    @staticmethod
    def update_wallet(wallet_id, wallet):
        wallet = Wallet.query.get(wallet_id)
        wallet.wallet_name = wallet['wallet_name']
        wallet.wallet_type = wallet['wallet_type']
        wallet.user_id = wallet['user_id']
        db.session.commit()
        return wallet

    @staticmethod
    def delete_wallet(wallet_id):
        wallet = Wallet.query.get(wallet_id)
        db.session.delete(wallet)
        db.session.commit()
        return '', 204
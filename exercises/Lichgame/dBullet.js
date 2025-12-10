class eBullet {

    constructor(object, xTarget, yTarget) {
        this.x = object.x;
        this.y = object.y;
        this.s = 10;
        this.xFocus = xTarget;
        this.yFocus = yTarget;
        this.lifespan = 80;
        this.hasDamaged = false;
      }
    
    display() {
        fill(100, 100, 100, 100);
        circle(this.x, this.y, 50)
        image(archerShotImg, this.x, this.y, 60, 60);
        
    }
    
    move() {
        if (this.lifespan > 0) {
            
            if (this.hasDamaged === false) {
                let dis = dist(this.x, this.y, this.xFocus, this.yFocus);       
                let vx = ((this.xFocus - this.x) / dis) * 9;
                let vy = ((this.yFocus - this.y) / dis) * 9;
                this.x = this.x + min(10, vx);
                this.y = this.y + min(10, vy);
            }
            
            
            this.lifespan = this.lifespan - 1;

            let disK = dist(this.x, this.y, player[0].x, player[0].y);
            if (disK < 30) {
                this.damageEvent();
            }

            let disT = dist(this.x, this.y, this.xFocus, this.yFocus);
            if (disT < 15) {
                this.hasDamaged = true;
            }
        }
    }

    damageEvent() {
        if (this.hasDamaged === false) {
            this.hasDamaged = true;
            player[0].sufferDamage();
        }
        
    }
    
    }